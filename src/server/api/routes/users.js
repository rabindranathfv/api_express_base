const express = require('express');
const userCtrl = require('../../controllers/user.ctrl');
const { checkToken, checkAdMinRole } = require('../middleware/auth');

const app = express();

app.get('/users', checkToken, userCtrl.getUsers);

app.get('/users/:id', checkToken, userCtrl.getUserById);

app.post('/users', [checkToken, checkAdMinRole], userCtrl.postCreateUser);

app.put('/users/password', checkToken, userCtrl.updateUserPassword);

app.put('/users/:id', [checkToken, checkAdMinRole], userCtrl.updateUser);

/* hard delete */
app.delete('/users/:id', [checkToken, checkAdMinRole], userCtrl.hardDeleteUser);

/* soft delete */
app.delete('/users/2/:id', checkToken, userCtrl.softDeleteUser);

module.exports = app;