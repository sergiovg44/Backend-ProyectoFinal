const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  artist_name: [{ 
    type: String, 
    required: true 
}], 
  images_grande: { 
    type: String, 
    required: true 
},
  images_mediana: { 
    type: String, 
    required: true 
},
  images_pequeña: { 
    type: String, 
    required: true 
},
  song_name: {
    type: String, 
    required: true 
},
  release_date: { 
    type: Date, 
    required: true 
},
  duration_ms: { 
    type: Number, 
    required: true 
},
  popularity: { 
    type: Number, 
    min: 0, 
    max: 100, 
    required: true 
},
});

const Donut = mongoose.model("Songs", songSchema, "songs");

module.exports = Donut;
