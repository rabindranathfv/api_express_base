'use stric'

const userService = require('../services/user.service');
const UserModel = require('../models/users');
const utils = require('../utils/utils');

const Debug = require('debug');
const debug = new Debug('backend:controller:user');
const saltRounds = 10;

const postCreateUser = async(req, res, next) => {
    try {
        console.log('create User routes lvl2', req.body);
        console.log('password encriptado', utils.hashPassword(req.body.password, saltRounds));
        let user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: utils.hashPassword(req.body.password, saltRounds),
            rol: req.body.rol
        });
        await userService.createUser(user, req, res);
        next();
    } catch (e) {
        console.log(e);
    }

}


module.exports = {
    postCreateUser
}