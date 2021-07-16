const PokeModel = require('./index');
const pokemon = require('../../pokemon.json');

PokeModel.insertMany(pokemon, (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Seeded ${pokemon.length} pokemon to pokedex`)
  }
})