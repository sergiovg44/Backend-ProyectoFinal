const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).json({ success: false, message: "Acceso denegado" });

  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token expired" });
  }
};


  module.exports = {verifyToken}