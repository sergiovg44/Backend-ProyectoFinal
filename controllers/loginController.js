const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/utils");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario o contraseña no válidos" });
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario o contraseña no válidos" });
    }

    const payload = {
      _id: user._id,
      nombre: user.nombre,
    };

    const token = generateToken(payload);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        token,
        nombre: user.nombre,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login };
