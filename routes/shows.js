'use strict';

const { getAllShows } = require('../controllers/showsCtrl');
const { Router } = require('express');
const showRouter = Router();


showRouter.get('/shows', getAllShows);

module.exports = showRouter;