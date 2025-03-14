const express = require("express");
const router = express.Router();
const { 
    getAllSongs 

} = require("../controllers/songController");





router.get("/songs", getAllSongs)


module.exports = router;