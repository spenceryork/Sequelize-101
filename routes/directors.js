'use strict';

const { getAllDirectors, createDirector, getADirector, updateDirector, deleteDirector } = require('../controllers/directorsCtrl');
const { Router } = require('express');
const directorRouter = Router();

directorRouter.get('/directors', getAllDirectors);
directorRouter.post('/directors', createDirector);
directorRouter.get('/directors/:id', getADirector);
directorRouter.put('/directors/:id', updateDirector);
directorRouter.delete('/directors/:id', deleteDirector);

module.exports = directorRouter;