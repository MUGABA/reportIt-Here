import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (userid, email, isadmin) => {
  const token = jwt.sign(
    {
      userid,
      email,
      isadmin
    },
    config.get("jwtKey")
  );
  return token;
};

module.exports = generateToken;
