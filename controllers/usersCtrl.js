"use strict";
const express = require("express");
const app = express();
app.set('models', require('../models'));
const models = app.get('models');
const { User, Show, Director } = app.get('models')

// GET ALL USERS
module.exports.getAllUsers = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        User.findAll()
        .then( Users => {
            res.status(200).json(Users);
            resolve(Users)
        })
        .catch( err => {
            console.log("oops", err);
            res.status(500).json({error})
            reject(error)
        });
    }) 
}

// CREATE A USER
module.exports.createUser = (req, res, next) => {
    return new Promise( (resolve, reject) => {
            User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username 
            })
            .then( (User) => {
                res.status(200).json(User)
                resolve(User);
            })
            .catch( (error) => {
                console.log('User could not be added', error);
                res.status(500).json(error);
                reject(error);
            });
    });
}

// GET SINGLE USER
module.exports.getAUser =  (req, res, next) => {
    return new Promise( (resolve, reject) => {
        User.findOne({
            raw: true,
            where: {id: req.params.id},
        })
        .then( user => {
            res.status(200).json(user);
            resolve(user);
        })
        .catch( () => {
            console.log("User could not be found");
            reject(error);
        });
    });
}

// UPDATE SINGLE USER
module.exports.updateUser = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        User.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username 
        }, {where: {id: req.params.id}})
        .then( () => {
            res.status(200).json();
            console.log("User has been updated");
            resolve();
        })
        .catch( error => {
            reject(error);
        });
    });
}

// DELETE USER
module.exports.deleteUser = (req, res, next) => {
    return new Promise( (resolve, reject) => {
        User.destroy({
            where: {id: req.params.id }
        })
        .then( (user) => {
            resolve(user)
        })
        .catch( (err) => {
            console.log("delete not complete", err);
            res.status(500).json({error});
            reject();
        });
    });
}