const express = require('express');
const userCtrl = require('../../controllers/user.ctrl');
const { checkToken, checkAdMinRole } = require('../middleware/auth');

const app = express();

/* checkToken */
app.get('/users', checkToken, userCtrl.getUsers);

/* checkToken, */
app.get('/users/:id', checkToken, userCtrl.getUserById);

/* [checkToken, checkAdMinRole] */
app.post('/users', [checkToken, checkAdMinRole], userCtrl.postCreateUser);

/* checkToken */
app.put('/users/password', checkToken, userCtrl.updateUserPassword);

/* [checkToken, checkAdMinRole], */
app.put('/users/:id', [checkToken, checkAdMinRole], userCtrl.updateUser);

/* hard delete */
/* [checkToken, checkAdMinRole], */
app.delete('/users/:id', [checkToken, checkAdMinRole], userCtrl.hardDeleteUser);

/* soft delete */
/* checkToken */
app.delete('/users/2/:id', checkToken, userCtrl.softDeleteUser);

module.exports = app;