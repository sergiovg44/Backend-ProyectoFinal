const UsersModel = require("../models/userModel")
const bcrypt = require("bcrypt");


const createUser = async (req, res) => {
    try {
      // console.log("Datos recibidos:", req.body);
      const {
        nombre,
        apellidos,
        email,
        password
      } = req.body;
  
      const newUser = {
        nombre,
        apellidos,
        email,
        password: await bcrypt.hash(password, 10),
      };
  
      await UsersModel.create(newUser);
      res.status(200).json({ success: true, message: "Usuario creado correctamente" });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ success: false, message: "El email ya está registrado" });
      }
      res.status(500).json({ status: "failed", error: error.message });
    }
  };

  const getUser = async (req, res) => {
    try {
        const idUser = req.payload._id;
      const users = await UsersModel.findById(idUser);
      if (!users) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error });
    }
  };

  const deleteUser = async (req, res) => {
    try {
        const idUser = req.payload._id;
      const user = await UsersModel.findByIdAndDelete(idUser);
  
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Usuario no encontrado" });
      }
      res
        .status(200)
        .json({ success: true, message: "Se ha borrado correctamente" });
    } catch (error) {
      console.error("Error en el servidor:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  module.exports ={
    createUser,
    getUser,
    deleteUser
  }