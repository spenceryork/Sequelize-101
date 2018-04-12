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

// SHOWS!

// GET ALL SHOWS
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

// GET ALL SHOWS WITH A SPECIFIC ID
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

// DELETE A SHOW
app.delete('shows/:id', (req, res, next) => {
    Show.destroy({
        where: {id: req.params.id }
    })
    .catch( (err) => {
        console.log("delete not complete", err);
        res.status(500).json({error});
    });
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

// **** DIRECTORS ****

// CREATE ONE DIRECTOR
app.post('/directors', (req, res, next) => {
    
})


// GET ALL DIRECTORS
app.get('/directors', (req, res, next) => {
    Director.findAll({include: [{model: Show, attributes: ["name", "genre"]}]})
    .then( directors => {
        res.status(200).json(directors);
    })
    .catch( (error) => {
        console.log("Directors not found", error)
        res.status(500).json({error})
    });
});

// GET ONE DIRECTOR
app.get('/directors/:id', (req, res, next) => {
    Director.findOne({
        raw: true,
        where: {id: req.params.id},
        include: [{model: Show, attributes: ["name"]}]
    })
    .then( director => {
        res.status(200).json(director)
    })
    .catch( error => {
        console.log("Director could not be found", error);
        res.status(500).json(error)
    });
});

// UPDATE ONE DIRECTOR
app.put('/directors/:id', (req, res, next) => {
    Director.update({
        name: req.body.name,
        birth_year: req.body.birth_year,
        twitter_handle: req.body.twitter_handle
    }, {where: {id: req.params.id}})
    .then( () => {
        res.status(200).json();
        console.log("Director has been updated");
    });
});




// ADD ROUTES FOR THE NECESSARY CRUD OPTIONS
// USE SEQUELIZE TO FIGURE OUT CRUD OPERATIONS










const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

