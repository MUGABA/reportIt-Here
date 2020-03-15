import jwt from "jsonwebtoken";
import config from "config";
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send({ message: "access denied! token is missing" });
  try {
    const decoded = jwt.verify(token, config.get("jwtKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ message: "invalid token" });
  }
};

module.exports = auth;
