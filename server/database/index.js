const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/pokedex', {
  useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database')
  }
});

var db = mongoose.connection;

const pokeSchema = new Schema({
  name: String,
  type: String,
  img: String
})

const PokeModel = mongoose.model('Poke', pokeSchema);

module.exports = db;
module.exports = PokeModel;