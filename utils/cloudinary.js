const cloudinary = require('cloudinary').v2;

// Configuración con tus datos de Cloudinary
cloudinary.config({
  cloud_name: 'dsrrcvkdm',      
  api_key: '697778634974772',            
  api_secret: 'jNxrhCdaYXuKbPvQMAJjuOPQ6HI'        
});

module.exports = cloudinary;
