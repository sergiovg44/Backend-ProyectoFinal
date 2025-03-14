const jwt = require("jsonwebtoken");

// Función para generar un token JWT
const generateToken = (payload) => {

    return jwt.sign(payload, process.env.SECRET_TOKEN, {
      expiresIn: "60min",
    });
  };
  
  
  
  module.exports = { generateToken }
  