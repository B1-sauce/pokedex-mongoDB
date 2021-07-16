const express = require('express');
const app = express();
const port = 3000;
const db = require('./database/index');
const controller = require('./controller');
const bodyParser = require('body-parser');
// const cors = require('cors');


const path = require('path')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Listening to ${port}`)
  }
})

app.get('/api', controller.getAll);
app.get('/api/:type', controller.fetchByType)
app.put('/api/:_id', controller.updateName)
app.delete('/api/:_id', controller.delete)