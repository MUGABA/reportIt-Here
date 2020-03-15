const config = require("config");

module.exports = function(req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  if (!config.get("jwtKey")) return next();

  if (!req.user.isadmin) return res.status(403).send("Access denied.");

  next();
};
