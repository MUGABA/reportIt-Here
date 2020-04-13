const config = require("config");

module.exports = function(req, res, next) {
  if (!config.get("jwtKey")) return next();
  const { isadmin } = req.user;
  if (!isadmin) return res.status(403).send("Access denied.");

  next();
};
