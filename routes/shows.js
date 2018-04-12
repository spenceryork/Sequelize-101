'use strict';

const { Router } = require('express');
const showRouter = Router();

showRouter.get('/shows', getAllShows);