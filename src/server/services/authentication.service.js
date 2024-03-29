'use strict';

const Debug = require('debug');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const path = require('path');
const nodeMailer = require('nodemailer');
// models
const UserModel = require('../models/users');

// utils
const utils = require('../utils/utils');

const debug = new Debug('backend:service:user');

const login = async(objUser, req, res) => {
  try {
    debug('Login User');
    UserModel.findOne({ email: objUser.email }, (err, userDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'usuario! o contraseña incorrecta'
          }
        });
      }

      if (!utils.checkPassword(objUser.password, userDB.password)) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'usuario o contraseña! incorrecta'
          }
        });
      }

      let token = jwt.sign({
        user: userDB,
      }, process.env.SEED, { expiresIn: process.env.TIME_TOKEN });
      res.json({
        ok: true,
        message: 'User Loggin sucess',
        user: userDB,
        token
      });
    });
  } catch (e) {
    debug('Login User - Error');
    console.log('Error en el servicio', e);
  }
}

const recoveryPassword = (objUser, req, res) => {
  try {
    debug('Recovery Password User');
    UserModel.findOne({ email: objUser.email }, (err, userDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      if (!userDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: `no existe el email ${objUser.email}`
          }
        });
      }

      res.json({
        ok: true,
        message: 'Recuperacion de contraseña exitosa',
        user: userDB,
      });
    });
  } catch (e) {

  }
}

module.exports = {
  login,
  recoveryPassword
}