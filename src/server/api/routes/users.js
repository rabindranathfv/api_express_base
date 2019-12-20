const express = require('express');
const UserModel = require('../../models/users');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const userCtrl = require('../../controllers/user.ctrl');
const { getUsers, getUserById, createUsers } = require('../../services/user.service');
const saltRounds = 10;

const app = express();

/* checkToken */
app.get('/users', userCtrl.getUsers);

/* checkToken, */
app.get('/users/:id', userCtrl.getUserById);

/* [checkToken, checkAdMinRole] */
app.post('/users', userCtrl.postCreateUser);

/* checkToken */
app.put('/users/password', userCtrl.updateUserPassword);

/* [checkToken, checkAdMinRole], */
app.put('/users/:id', userCtrl.updateUser);

/* hard delete */
/* [checkToken, checkAdMinRole], */
app.delete('/users/:id', userCtrl.hardDeleteUser);

/* soft delete */
/* checkToken */
app.delete('/users/2/:id', userCtrl.softDeleteUser);

module.exports = app;