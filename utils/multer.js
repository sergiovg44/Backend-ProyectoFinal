const multer = require('multer');

// Multer va a guardar la imagen en la memoria temporalmente
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

module.exports = upload;
