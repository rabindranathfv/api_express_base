'use stric'

const jwt = require('jsonwebtoken');

const authenticationService = require('../services/authentication.service');
const utils = require('../utils/utils');

const Debug = require('debug');
const debug = new Debug('backend:controller:authentication');

const postLogin = async(req, res) => {
  const userData = req.body;
  console.log('user data in Authentication Ctrl', userData);
  const user = await authenticationService.login(userData, req, res);
}

const postRecoverPassword = async(req, res) => {
  const userData = req.body;
  const userRecover = await authenticationService.recoveryPassword(userData, req, res);
}

module.exports = {
  postLogin,
  postRecoverPassword
}