"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('models', require('./models'));
const models = app.get('models');
const { User, Show, Director } = app.get('models')

// middleware stack
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/shows', (req, res, next) => {
    Show.findAll({include: [{model: Director, attributes: ["name"]}]})
    .then( shows => {
        res.status(200).json(shows);
    })
    .catch( err => {
        console.log("oops", err);
        res.status(500).json({error})
    })
});

app.get('/shows/:id', (req, res, next) => {
    Show.findOne({
        raw: true,
        where: {id: req.params.id},
        include: [{model: Director, attributes: ["name"]}]
    })
    .then( show => {
        res.status(200).json(show);
    })
    .catch( () => {
        console.log("didn't work");
    })
});

// ADD FAVORITE FOR A USER
app.post('/favorites', ({body: { UserId, ShowId}}, res, next) => {
    User.findById(UserId)
    .then( foundUser => {
        foundUser.addFavorite(ShowId)
        .then( (newRecord) => {
            console.log("new record", newRecord);
            res.status(201).json(newRecord);
        });
    });
});


// ADD ROUTES FOR THE NECESSARY CRUD OPTIONS
// USE SEQUELIZE TO FIGURE OUT CRUD OPERATIONS










const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

