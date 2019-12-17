'use strict';

const Debug = require('debug');
// models

const debug = new Debug('backend:service:user');


const getUsers = async(req, res) => {

}

const getUserById = async(req, res) => {

}

const createUser = async(user, req, res) => {
    try {
        debug('Create User');
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
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    createUser,
    getUserById,
    getUsers
}