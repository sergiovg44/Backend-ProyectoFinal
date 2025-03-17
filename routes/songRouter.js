const express = require("express");
const router = express.Router();
const { 
    getAllSongs, 
    getById

} = require("../controllers/songController");





router.get("/songs", getAllSongs)
router.get("/songs/:idSong", getById)


module.exports = router;