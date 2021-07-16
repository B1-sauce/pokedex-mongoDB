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
    console.log(req.params._id, req)
    PokeModel.findOneAndUpdate(req.params._id, { name: req.body.name })
      .then(() => res.status(200).send(`${req.body.name} updated in pokedex!`))
      .catch((err) => res.status(404).send(err))
  },
  delete(req, res) {
    PokeModel.findOneAndDelete(req.params._id)
      .then(() => res.status(200).send(`${req.body.name} updated in pokedex!`))
      .catch((err) => {
        console.log('from error')
        res.status(404).send(err)
      })
  }

}

module.exports = controller