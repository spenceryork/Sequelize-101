"use strict";
const express = require("express");
const app = express();
app.set('models', require('../models'));
const models = app.get('models');
const { User, Show, Director } = app.get('models')

// GET ALL DIRECTORS
module.exports.getAllDirectors = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Director.findAll({include: [{model: Show, attributes: ["name"]}]})
        .then( Directors => {
            res.status(200).json(Directors);
            resolve(Directors)
        })
        .catch( err => {
            console.log("oops", err);
            res.status(500).json({error})
            reject(error)
        });
    }) 
}

// CREATE A DIRECTOR
module.exports.createDirector = (req, res, next) => {
    return new Promise( (resolve, reject) => {
            Director.create({
                name: req.body.name,
                birth_year: req.body.birth_year,
                twitter_handle: req.body.twitter_handle  
            })
            .then( (director) => {
                res.status(200).json(director)
                resolve(director);
            })
            .catch( (error) => {
                console.log('Director could not be added', error);
                res.status(500).json(error);
                reject(error);
            });
    });
}

// GET SINGLE DIRECTOR
module.exports.getADirector =  (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Director.findOne({
            raw: true,
            where: {id: req.params.id},
            include: [{model: Show, attributes: ["name"]}]
        })
        .then( director => {
            res.status(200).json(director);
            resolve(director);
        })
        .catch( () => {
            console.log("didn't work");
            reject(error);
        });
    });
}

// UPDATE SINGLE DIRECTOR
module.exports.updateDirector = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Director.update({
            name: req.body.name,
            birth_year: req.body.birth_year,
            twitter_handle: req.body.twitter_handle
        }, {where: {id: req.params.id}})
        .then( () => {
            res.status(200).json();
            console.log("Director has been updated");
            resolve();
        })
        .catch( error => {
            reject(error);
        });
    });
}

// DELETE DIRECTOR
module.exports.deleteDirector = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Director.destroy({
            where: {id: req.params.id }
        })
        .then( (director) => {
            resolve(director)
        })
        .catch( (err) => {
            console.log("delete not complete", err);
            res.status(500).json({error});
            reject();
        });
    });
}