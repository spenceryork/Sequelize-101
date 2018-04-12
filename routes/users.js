'use strict';

const { getAllUsers, createUser, getAUser, updateUser, deleteUser } = require('../controllers/UsersCtrl');
const { Router } = require('express');
const userRouter = Router();

userRouter.get('/users', getAllUsers);
userRouter.post('/users', createUser);
userRouter.get('/users/:id',getAUser);
userRouter.put('/users/:id',updateUser);
userRouter.delete('/users/:id', deleteUser);

module.exports = userRouter;