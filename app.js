"use strict";

const express = require("express");
const app = express();
const routes = require("./routes/");
const bodyParser = require("body-parser");

app.set('models', require('./models'));
const models = app.get('models');
const { User, Show, Director } = app.get('models')

// middleware stack
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/', routes);









const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

