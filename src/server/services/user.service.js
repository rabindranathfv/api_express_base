'use strict';

const Debug = require('debug');

// models
const UserModel = require('../models/users');

// utils
const utils = require('../utils/utils');

const debug = new Debug('backend:service:user');
const saltRounds = 10;

const getUsers = async(req, res) => {

}

const getUserById = async(req, res) => {

}

const createUser = async(objUser, req, res) => {
    try {
        debug('Create User');
        let user = new UserModel({
            name: objUser.name,
            email: objUser.email,
            password: utils.hashPassword(objUser.password, saltRounds),
            rol: objUser.rol
        });
        return user.save((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `problems with users creation, db troubles`,
                    err
                });
            }
            res.json({
                ok: true,
                message: 'create users sucessfully',
                user: userDB
            });
        });
    } catch (e) {
        debug('Create User Error');
        console.log('Error en el servicio', e);
    }
}

const updateUserPassword = async(req, res) => {

}

const updateUser = async() => {

}

const hardDeleteUser = async() => {

}

const softDeleteUser = async() => {

}

module.exports = {
    createUser,
    getUserById,
    getUsers,
    updateUserPassword,
    updateUser,
    hardDeleteUser,
    softDeleteUser
}