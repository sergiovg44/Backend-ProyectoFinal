const cloudinary = require('cloudinary').v2;

// Configuración con tus datos de Cloudinary
cloudinary.config({
  cloud_name: 'dsrrcvkdm',      
  api_key: process.env.API_KEY,            
  api_secret: process.env.API_SECRET        
});

module.exports = cloudinary;
