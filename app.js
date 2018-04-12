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

// **** SHOWS ****

// CREATE A SHOW
// app.post('/shows', (req, res, next) => {
//     Show.create({
//         name: req.body.name,
//         network: req.body.network,
//         genre: req.body.genre,
//         in_production: req.body.in_production,
//         directorId: req.body.directorId    
//     })
//     .then( (show) => {
//         res.status(200).json(show)
//     })
//     .catch( (error) => {
//         console.log('Show could not be added', error);
//         res.status(500).json(error);
//     })
// });

// // GET ALL SHOWS
// app.get('/shows', (req, res, next) => {
//     Show.findAll({include: [{model: Director, attributes: ["name"]}]})
//     .then( shows => {
//         res.status(200).json(shows);
//     })
//     .catch( err => {
//         console.log("oops", err);
//         res.status(500).json({error})
//     })
// });

// // GET ALL SHOWS WITH A SPECIFIC ID
// app.get('/shows/:id', (req, res, next) => {
//     Show.findOne({
//         raw: true,
//         where: {id: req.params.id},
//         include: [{model: Director, attributes: ["name"]}]
//     })
//     .then( show => {
//         res.status(200).json(show);
//     })
//     .catch( () => {
//         console.log("didn't work");
//     })
// });

// // UPDATE ONE SHOW
// app.put('/shows/:id', (req, res, next) => {
//     Show.update({
//         name: req.body.name,
//         network: req.body.network,
//         genre: req.body.genre,
//         in_production: req.body.in_production,
//         directorId: req.body.directorId 
//     }, {where: {id: req.params.id}})
//     .then( () => {
//         res.status(200).json();
//         console.log("Director has been updated");
//     });
// });

// // DELETE A SHOW
// app.delete('/shows/:id', (req, res, next) => {
//     Show.destroy({
//         where: {id: req.params.id }
//     })
//     .catch( (err) => {
//         console.log("delete not complete", err);
//         res.status(500).json({error});
//     });
// });

// // ADD FAVORITE FOR A USER
// app.post('/favorites', ({body: { UserId, ShowId}}, res, next) => {
//     User.findById(UserId)
//     .then( foundUser => {
//         foundUser.addFavorite(ShowId)
//         .then( (newRecord) => {
//             console.log("new record", newRecord);
//             res.status(201).json(newRecord);
//         });
//     });
// });

// **** DIRECTORS ****

// // CREATE ONE DIRECTOR
// app.post('/directors', (req, res, next) => {
//     Director.create({
//         name: req.body.name,
//         birth_year: req.body.birth_year,
//         twitter_handle: req.body.twitter_handle
//     })
//     .then( director => {
//         res.status(200).json(director)
//     })
//     .catch( (error) => {
//         console.log("user could not be added", error)
//         res.status(500).json({error})
//     });
// });


// // GET ALL DIRECTORS
// app.get('/directors', (req, res, next) => {
//     Director.findAll({include: [{model: Show, attributes: ["name", "genre"]}]})
//     .then( directors => {
//         res.status(200).json(directors);
//     })
//     .catch( (error) => {
//         console.log("Directors not found", error)
//         res.status(500).json({error})
//     });
// });

// // GET ONE DIRECTOR
// app.get('/directors/:id', (req, res, next) => {
//     Director.findOne({
//         raw: true,
//         where: {id: req.params.id},
//         include: [{model: Show, attributes: ["name"]}]
//     })
//     .then( director => {
//         res.status(200).json(director)
//     })
//     .catch( error => {
//         console.log("Director could not be found", error);
//         res.status(500).json(error)
//     });
// });

// // UPDATE ONE DIRECTOR
// app.put('/directors/:id', (req, res, next) => {
//     Director.update({
//         name: req.body.name,
//         birth_year: req.body.birth_year,
//         twitter_handle: req.body.twitter_handle
//     }, {where: {id: req.params.id}})
//     .then( () => {
//         res.status(200).json();
//         console.log("Director has been updated");
//     });
// });

// // DELETE ONE DIRECTOR
// app.delete('/directors/:id', (req, res, next) => {
//     console.log("delete is being called");
//     Director.destroy({
//         where: {id: req.params.id},
//         force: true
//     })
//     .catch( (err) => {
//         console.log("delete not complete", err);
//         res.status(500).json({error});
//     });
// });

// **** USERS ****

// CREATE ONE USER
app.post('/users', (req, res, next) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username
    })
    .then( user => {
        res.status(200).json(user)
    })
    .catch( (error) => {
        console.log("user could not be added", error)
        res.status(500).json({error})
    });
});


// GET ALL USERS
app.get('/users', (req, res, next) => {
    User.findAll()
    .then( users => {
        res.status(200).json(users);
    })
    .catch( (error) => {
        console.log("Users not found", error)
        res.status(500).json({error})
    });
});

// GET ONE USER
app.get('/users/:id', (req, res, next) => {
    User.findOne({
        raw: true,
        where: {id: req.params.id},
    })
    .then( user => {
        res.status(200).json(user)
    })
    .catch( error => {
        console.log("User could not be found", error);
        res.status(500).json(error)
    });
});

// UPDATE ONE USER
app.put('/user/:id', (req, res, next) => {
    User.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username
    }, {where: {id: req.params.id}})
    .then( () => {
        res.status(200).json();
        console.log("User has been updated");
    });
});

// DELETE ONE DIRECTOR
app.delete('/user/:id', (req, res, next) => {
    User.destroy({
        where: {id: req.params.id},
        force: true
    })
    .catch( (err) => {
        console.log("delete not complete", err);
        res.status(500).json({error});
    });
});






const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;

