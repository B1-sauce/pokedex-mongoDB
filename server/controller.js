const PokeModel = require('./database/index.js');
const controller = {
  getAll(req, res) {
    PokeModel.find((err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(result)
      }
    })
  },
  fetchByType(req, res) {
    console.log(req.params)
    PokeModel.find({ type: req.params.type }, (err, result) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(result)
      }
    })
  },
  updateName(req, res) {
    PokeModel.updateOne({ _id: req.params._id }, { name: req.body.name })
      .then(() => res.status(200).send(`${req.body.name} updated in pokedex!`))
      .catch((err) => res.status(404).send(err))
  },
  delete(req, res) {
    console.log(req.params._id)
    PokeModel.deleteOne({ _id: req.params._id })
      .then(() => res.status(200).send(`${req.body.name} deleted in pokedex!`))
      .catch((err) => {
        console.log('from error')
        res.status(404).send(err)
      })
  },
  insert(req, res) {
    const { name, type, img } = req.body;
    const poke = new PokeModel({
      name: name,
      type: type,
      img: img
    })
    poke.save((err) => {
      if (err) {
        res.status(404).send(err)
      } else {
        res.status(200).send(`${req.body.name} inserted in pokedex!`)
      }
    })
  }

}

module.exports = controller