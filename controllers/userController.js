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
      res.status(200).json({ success: true, data: users });
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

  const addToFavourites = async (req, res) => {
    try {
      const  {idSong}  = req.params; // ID de la canción
      const idUser = req.payload._id; // ID del usuario desde el JWT
  
      if (!idUser) {
        return res.status(400).json({ success: false, message: "Usuario no encontrado" });
      }
  
      const user = await UsersModel.findById(idUser);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "Usuario no existe en la base de datos" });
      }
  
      const isIncluded = user.favoritas.includes(idSong);
      if (isIncluded) {
        return res.status(400).json({ success: false, message: "Ya tienes esa canción en favoritos" });
      }
  
      await UsersModel.updateOne(
        { _id: idUser },
        { $push: { favoritas: idSong } }
      );
      const updatedUser = await UsersModel.findById(idUser)
      return res.status(200).json({
        success: true,
        message: "Canción agregada a favoritos",
        data: updatedUser,
      });
  
    } catch (error) {
      console.error("Error al agregar a favorito:", error);
      return res.status(500).json({ success: false, message: "Error interno", error: error.message });
    }
  };
  const deleteToFavourites = async (req, res) => {
    try {
      const { idSong } = req.params;
      const idUser = req.payload._id;
  
      if (!idUser) {
        return res.status(400).json({ success: false, message: "Usuario no encontrado" });
      }
  
      const user = await UsersModel.findById(idUser);
      if (!user) {
        return res.status(404).json({ success: false, message: "Usuario no existe en la base de datos" });
      }
  
      const isIncluded = user.favoritas.includes(idSong);
      if (!isIncluded) {
        return res.status(400).json({ success: false, message: "La canción no está en favoritos" });
      }
  
      await UsersModel.updateOne(
        { _id: idUser },
        { $pull: { favoritas: idSong } } // ⬅️ QUITA la canción del array
      );
  
      const updatedUser = await UsersModel.findById(idUser);
      return res.status(200).json({
        success: true,
        message: "Canción eliminada de favoritos",
        data: updatedUser,
      });
  
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
      return res.status(500).json({ success: false, message: "Error interno", error: error.message });
    }
  };


  
  module.exports ={
    createUser,
    getUser,
    deleteUser,
    addToFavourites,
    deleteToFavourites
  }