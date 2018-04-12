"use strict";

const express = require("express");
const app = express();
const routes = require("./routes/");
const bodyParser = require("body-parser");

app.set('models', require('./models'));
const models = app.get('models');
const { User, Show, Director } = app.get('models')

// MIDDLEWARE STACK
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/', routes);


// ERROR HANDLING
app.use( (req, res, next) => {
    let error = new Error("Not found");
    error.status = 404;
    next(error)
});

app.use( (error, req, res, next) => {
    res.status ( error.status || 500 );
    res.json({
        message: "Error error error!",
        error: error.message
    });
})




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

