'use strict';

const { hashPassword, checkPassword } = require('../utils/uitls');
const Debug = require('debug');
const utils = require('../utils/uitls');
// models
const UserModel = require('../models/users');

const debug = new Debug('backend:routes/controllers:user');
const saltRounds = 10;

const getUsers = async(req, res) => {

}

const getUserById = async(req, res) => {

}

const createUsers = async(req, res) => {
    debug('Create User');
    let user = new UserModel({
        name: body.name,
        email: body.email,
        password: utils.hashPassword(body.password, saltRounds),
        rol: body.rol
    });

    user.save((err, userDB) => {
        if (err) {
            debug('sucess - create user');
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
}