import _ from "lodash";
import bcrypt from "bcrypt";
import User from "../database/models/authQueries";
import validate from "../helpers/validations/authValidation";
import generatePassword from "../helpers/otherHelpers/generatePassHash";
import generateToken from "../helpers/otherHelpers/generateToken";

const registerUser = async (req, res) => {
  const user = _.pick(req.body, [
    "firstname",
    "lastname",
    "othernames",
    "username",
    "email",
    "password",
    "phonenumber"
  ]);

  const { error } = await validate.validateUser(user);
  if (error) return res.status(400).send({ error: error.details[0].message });

  user.password = await generatePassword(user);

  const checkUserExisttance = await User.getSpecificUser(user.email);
  if (checkUserExisttance)
    return res
      .status(400)
      .send({ status: 400, message: "Email already taken!" });

  const result = await User.createUserAccount(user);
  const { userid, email, isadmin } = result;
  const token = await generateToken(userid, email, isadmin);
  return res
    .status(201)
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      token,
      user: _.pick(result, [
        "userid",
        "firstname",
        "lastname",
        "username",
        "email",
        "phonenumber"
      ])
    });
};

const loginUser = async (req, res) => {
  // gettuing use email and password
  const user = _.pick(req.body, ["email", "password"]);

  const { error } = await validate.validateLogin(user);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const result = await User.getSpecificUser(user.email);
  if (!result)
    return res
      .status(400)
      .send({ status: 400, message: "Wrong email or password" });

  const { userid, email, isadmin, password } = result;
  console.log(result);

  const isValid = await bcrypt.compare(user.password, password);
  if (!isValid)
    return res.status(400).send({ message: "Wrong email or password" });

  const token = await generateToken(userid, email, isadmin);
  return res
    .status(201)
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send({
      token,
      user: _.pick(result, [
        "userid",
        "firstname",
        "lastname",
        "username",
        "email",
        "phonenumber"
      ])
    });

  // send the token to the header of the browser
};

export default {
  registerUser,
  loginUser
};
