const SongModel = require ("../models/songModel")

const getAllSongs = async (req, res) => {
    try {
      const Songs = await SongModel.find();
  
      if (Songs.length === 0) {
        return res.status(200).json({
          status: "Success",
          data: [],
          message: "No hay canciones en la base de datos",
        });
      }
  
      res.status(200).json({ status: "Success", data: Songs });
    } catch (error) {
      res.status(500).json({ status: "Failed", error: error.message });
    }
  };

  const getById = async (req, res) => {
    try {
      const idSong = req.params.idSong; 
      const song = await SongModel.findById(idSong); 
  
      if (!song) {
        return res.status(404).json({ status: "Failed", error: error.message });
      }
  
      res.status(200).json({ status: "Success", data: song });
    } catch (error) {
      res.status(500).json({ status: "Failed", error: error.message });
    }
  };



module.exports = {
    getAllSongs,
    getById
}