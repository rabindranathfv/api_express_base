'use strict';

const Debug = require('debug');

// models
const userModel = require('../models/users');

// utils
const utils = require('../utils/utils');

const debug = new Debug('backend:service:user');
const saltRounds = 10;

const getUsers = async(req, res) => {

}

const getUserById = async(req, res) => {

}

const createUser = async(objUser) => {
    try {
        debug('Create User');
        let user = new UserModel({
            name: objUser.name,
            email: objUser.email,
            password: utils.hashPassword(objUser.password, saltRounds),
            rol: objUser.rol
        });
        return user.save();
    } catch (e) {
        console.log('Error en el servicio', e);
    }
}

module.exports = {
    createUser,
    getUserById,
    getUsers
}