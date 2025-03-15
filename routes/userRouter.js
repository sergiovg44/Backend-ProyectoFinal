const express = require("express");
const { 
    createUser,
    getUser,
    deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");


const router = express.Router();

//Ruta simple sin autentificacion
router.post("/register", createUser)

//Con autentidicacion en un futuro añadir middlewares
router.get("/user", verifyToken, getUser)
router.delete("/user",verifyToken ,deleteUser)

module.exports = router;