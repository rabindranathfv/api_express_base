'use strict';

const Debug = require('debug');

// models
const UserModel = require('../models/users');

// utils
const utils = require('../utils/utils');

const debug = new Debug('backend:service:user');
const saltRounds = 10;

const getUsers = async(req, res, start, limit) => {

    // the find condition and count condition must be the same for count in the right way
    UserModel.find({ state: true }, 'name email rol')
        .skip(start)
        .limit(limit)
        .exec((err, usersLists) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `not users exist`,
                    err
                });
            }
            UserModel.countDocuments({ state: true }, (err, numUsers) => {
                res.json({
                    ok: true,
                    message: 'get list of users successfully',
                    amountUsers: numUsers,
                    user: usersLists
                });
            });
        });
}

const getUserById = async(req, res, ObjectUser, userId) => {
    UserModel.findByIdAndUpdate(userId, body, { new: true, runValidators: true, useFindAndModify: 'false' })
        .exec((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `the user doesn't exist`,
                    err
                });
            }
            res.json({
                ok: true,
                message: `the user exist`,
                user: userDB
            });
        });
}

const createUser = async(req, res, objUser) => {
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