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





module.exports = {
    getAllSongs,
    
}