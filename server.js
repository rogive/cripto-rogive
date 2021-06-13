const express = require('express');
const Buda = require('./buda');

require('dotenv').config();
const app = express();

var api_key = process.env.KEY_BUDA;
var api_secret = process.env.SECRET_BUDA;
var privateBuda = new Buda(api_key, api_secret);

app.get('/markets/:id', (req, res) => {
  const { id } = req.params;
  console.log('id: ', id);
  console.log('type: ', typeof id);
  privateBuda.ticker(id).then(function(result) {
    res.status(200).json(result);
  }).catch((err) => {
    res
      .status(401)
      .json({ message: `market not found`, err: err });
  });
});

app.listen(8000, () => console.log('App on http://localhost:8000/'));