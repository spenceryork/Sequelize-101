"use strict";
const express = require("express");
const app = express();
app.set('models', require('../models'));
const models = app.get('models');
const { User, Show, Director } = app.get('models')

// GET ALL SHOWS
module.exports.getAllShows = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Show.findAll({include: [{model: Director, attributes: ["name"]}]})
        .then( shows => {
            res.status(200).json(shows);
            resolve(shows)
        })
        .catch( err => {
            console.log("oops", err);
            res.status(500).json({error})
            reject(error)
        });
    }) 
}

// CREATE A SHOW
module.exports.createShow = (req, res, next) => {
    return new Promise( (resolve, reject) => {
            Show.create({
                name: req.body.name,
                network: req.body.network,
                genre: req.body.genre,
                in_production: req.body.in_production,
                directorId: req.body.directorId    
            })
            .then( (show) => {
                res.status(200).json(show)
                resolve(show);
            })
            .catch( (error) => {
                console.log('Show could not be added', error);
                res.status(500).json(error);
                reject(error);
            });
    });
}

// GET SINGLE SHOW
module.exports.getAShow =  (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Show.findOne({
            raw: true,
            where: {id: req.params.id},
            include: [{model: Director, attributes: ["name"]}]
        })
        .then( show => {
            res.status(200).json(show);
            resolve(show);
        })
        .catch( () => {
            console.log("didn't work");
            reject(error);
        });
    });
}

// UPDATE SINGLE SHOW
module.exports.updateShow = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Show.update({
            name: req.body.name,
            network: req.body.network,
            genre: req.body.genre,
            in_production: req.body.in_production,
            directorId: req.body.directorId 
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

// DELETE SHOW
module.exports.deleteShow = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        Show.destroy({
            where: {id: req.params.id }
        })
        .then( (show) => {
            resolve(show)
        })
        .catch( (err) => {
            console.log("delete not complete", err);
            res.status(500).json({error});
            reject();
        });
    });
}

// POST FAVORITE SHOW
module.exports.postFavorite = ({body: { UserId, ShowId}}, res, next) => {
    return new Promise( (resolve, reject) => {
        User.findById(UserId)
        .then( foundUser => {
            foundUser.addFavorite(ShowId)
            .then( (newRecord) => {
                console.log("new record", newRecord);
                res.status(201).json(newRecord);
            });
        });
    });
}

