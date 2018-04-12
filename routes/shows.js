'use strict';

const { getAllShows, createShow, getAShow, updateShow, deleteShow, postFavorite } = require('../controllers/showsCtrl');
const { Router } = require('express');
const showRouter = Router();


showRouter.get('/shows', getAllShows);
showRouter.post('/shows', createShow);
showRouter.get('/shows/:id', getAShow);
showRouter.put('/shows/:id', updateShow);
showRouter.delete('/shows/:id', deleteShow);
showRouter.post('/favorites', postFavorite);

module.exports = showRouter;