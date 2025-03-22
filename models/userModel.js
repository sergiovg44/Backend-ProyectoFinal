const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
      nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
      },
  
      apellidos: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"],
        //aqui validamos que el correo debe tener un @ y un .
        validate: {
          validator: function (value) {
            const partes = value.split("@");
            if (partes.length !== 2) return false; 
      
            const dominio = partes[1];
            if (!dominio.includes(".")) return false; 
      
            return true;
          },
          message: "El email tiene que contener un @ y un .",
        },

        lowercase: true,
        trim: true,
        unique: true,
      },
  
      password: {
        type: String,
        minLength: [3, "La contraseña debe contener minimo 3 caracteres"],
        required: [true, "La contraseña es obligatoria"],
      },
      favoritas: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: "Songs",
      },
      profileImage: {
        type: String,
        default: "https://res.cloudinary.com/dsrrcvkdm/image/upload/v1742219276/k8hkwn8lo6rwk9malpgi.jpg"
      }
    }
  );

const UsersModel = mongoose.model("Users", usersSchema, "users");

module.exports = UsersModel;
