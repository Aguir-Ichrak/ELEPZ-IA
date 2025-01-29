const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Denied Access" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
