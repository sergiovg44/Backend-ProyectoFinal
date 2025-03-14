const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URL;
const connectToDatabase = async () => {
  try {
    
    await mongoose.connect(dbUrl);
    console.log('Conexión a mongoDB exitosa');
  } catch (err) {
    console.log('Error al conectar con MongoDB', err)
  }
}

module.exports = connectToDatabase;