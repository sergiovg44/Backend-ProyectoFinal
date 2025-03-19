const express = require("express");
const { 
    createUser,
    getUser,
    deleteUser,
    addToFavourites,
    deleteToFavourites,
    updateUser,
    updateImageProfile,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/auth");
const upload = require("../utils/multer");


const router = express.Router();

//Ruta simple sin autentificacion
router.post("/register", createUser)


//Con autentidicacion en un futuro añadir middlewares
router.post("/favourite/:idSong", verifyToken, addToFavourites)
router.delete("/favourite/:idSong", verifyToken, deleteToFavourites)
router.get("/user", verifyToken, getUser)
router.patch("/user",verifyToken ,updateUser)
router.patch("/imageProfile",verifyToken, upload.single("image") ,updateImageProfile)
router.delete("/user",verifyToken ,deleteUser)

module.exports = router;