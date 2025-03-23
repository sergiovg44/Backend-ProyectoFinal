const UsersModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary");
const sendEmail = require("../services/emailService");

const createUser = async (req, res) => {
  try {

    const { nombre, apellidos, email, password } = req.body;

    const newUser = {
      nombre,
      apellidos,
      email,
      password: await bcrypt.hash(password, 10),
    };

    await UsersModel.create(newUser);
    res
      .status(200)
      .json({ success: true, message: "Usuario creado correctamente" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "El email ya está registrado" });
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
    const { idSong } = req.params; 
    const idUser = req.payload._id; 

    if (!idUser) {
      return res
        .status(400)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const user = await UsersModel.findById(idUser);

    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Usuario no existe en la base de datos",
        });
    }

    const isIncluded = user.favoritas.includes(idSong);
    if (isIncluded) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Ya tienes esa canción en favoritos",
        });
    }

    await UsersModel.updateOne(
      { _id: idUser },
      { $push: { favoritas: idSong } }
    );
    const updatedUser = await UsersModel.findById(idUser);
    return res.status(200).json({
      success: true,
      message: "Canción agregada a favoritos",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error al agregar a favorito:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno", error: error.message });
  }
};
const deleteToFavourites = async (req, res) => {
  try {
    const { idSong } = req.params;
    const idUser = req.payload._id;

    if (!idUser) {
      return res
        .status(400)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const user = await UsersModel.findById(idUser);
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Usuario no existe en la base de datos",
        });
    }

    const isIncluded = user.favoritas.includes(idSong);
    if (!isIncluded) {
      return res
        .status(400)
        .json({ success: false, message: "La canción no está en favoritos" });
    }

    await UsersModel.updateOne(
      { _id: idUser },
      { $pull: { favoritas: idSong } }
    );

    const updatedUser = await UsersModel.findById(idUser);
    return res.status(200).json({
      success: true,
      message: "Canción eliminada de favoritos",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const idUser = req.payload._id; 
    const { nombre, apellidos, password } = req.body;

    const updateData = { nombre, apellidos };

    // Solo encripta si se envía una nueva contraseña
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UsersModel.findByIdAndUpdate(idUser, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Usuario actualizado correctamente",
        data: updatedUser,
      });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateImageProfile = (req, res) => {
  try {
    const idUser = req.payload._id; 
    const fileBuffer = req.file.buffer; 


    const streamUpload = cloudinary.uploader.upload_stream(
      {
        transformation: [
          { quality: "auto", fetch_format: "auto" },
          { width: 300, height: 300, crop: "fill" },
        ],
      },
      async (error, result) => {
        if (error) {
          console.error("Error Cloudinary:", error);
          return res
            .status(500)
            .json({ success: false, message: "Error al subir imagen" });
        }

        const user = await UsersModel.findByIdAndUpdate(
          idUser,
          { profileImage: result.secure_url } 
        );

        res
          .status(200)
          .json({ success: true, message: "Imagen actualizada", data: user });
      }
    );

    streamUpload.end(fileBuffer); 
  } catch (error) {
    console.error("Error general:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno", error: error.message });
  }
};

const contactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (name.trim().length < 3) {
    return res
      .status(400)
      .json({
        success: false,
        message: "El nombre debe tener al menos 3 caracteres.",
      });
  }

  if (subject.trim().length < 3) {
    return res
      .status(400)
      .json({
        success: false,
        message: "El asunto debe tener al menos 3 caracteres.",
      });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Por favor, ingresa un correo electrónico válido.",
      });
  }

  if (message.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "El mensaje no puede estar vacío." });
  }

  try {

    await sendEmail({ name, email, subject, message });

    return res
      .status(200)
      .json({
        success: true,
        message: "Se ha enviado la información correctamente.",
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error al enviar el correo." });
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  addToFavourites,
  deleteToFavourites,
  updateUser,
  updateImageProfile,
  contactEmail,
};
