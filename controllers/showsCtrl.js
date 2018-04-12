"use strict";
const express = require("express");
const app = express();
app.set('models', require('../models'));
const models = app.get('models');
const { User, Show, Director } = app.get('models')

// GET ALL SHOWS
module.exports.getAllShows = (req, res, next) => {
    Show.findAll({include: [{model: Director, attributes: ["name"]}]})
    .then( shows => {
        res.status(200).json(shows);
    })
    .catch( err => {
        console.log("oops", err);
        res.status(500).json({error})
    });
}

