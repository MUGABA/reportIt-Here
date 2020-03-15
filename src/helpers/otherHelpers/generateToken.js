import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (userid, email, isAdmin) => {
  const token = jwt.sign(
    {
      userid,
      email,
      isAdmin
    },
    config.get("jwtKey")
  );
  return token;
};

module.exports = generateToken;
