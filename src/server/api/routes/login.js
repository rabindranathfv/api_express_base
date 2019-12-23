const express = require('express');
const authenticationCtrl = require('../../controllers/authentication.ctrl');

const app = express();

app.post('/login', authenticationCtrl.postLogin);

app.post('/recoverPass', authenticationCtrl.postRecoverPassword);

module.exports = app;