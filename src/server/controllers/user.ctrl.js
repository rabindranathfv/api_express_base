'use stric'

const userService = require('../services/user.service');
const _ = require('underscore');

// utils
const utils = require('../utils/utils');

const Debug = require('debug');
const debug = new Debug('backend:controller:user');
const saltRounds = 10;

const getUsers = async(req, res) => {
    // route /users?limit=<value>&start=<value>
    console.log(` QueryParams `, req.query);
    let start = req.query.start || 0;
    start = Number(start);
    let limit = req.query.limit || 15;
    limit = Number(limit);
    const users = await userService.getUsers(req, res, start, limit);
}

const getUserById = async(req, res) => {
    let userId = req.params.id;
    let body = req.body;
    const user = await userService.getUserById(req, res, body, userId);
}

const postCreateUser = async(req, res) => {
    const userData = req.body;
    console.log('create User Ctrl', userData);
    const user = await userService.createUser(req, res, userData);
}

const updateUserPassword = async(req, res) => {
    let body = req.body;
    let userId = body.id;
    let cleanBody = _.pick(body, ['password']);
    cleanBody.password = utils.hashPassword(body.newPassword, saltRounds);

    const userPassword = await userService.updateUserPassword(req, res, cleanBody, userId)
}

const updateUser = async(req, res) => {
    let id = req.params.id;
    // _.pick grabs and object and return the same object with keys you defined into arrays as second parameter
    let CleanBody = _.pick(req.body, ['name', 'email', 'img', 'rol', 'state']);

    const userUpd = await userService.updateUser(req, res, CleanBody, id);
}

const hardDeleteUser = async(req, res) => {

}

const softDeleteUser = async(req, res) => {
    console.log(` delete User - soft delete `);
    let idUser = req.params.id;
    req.body.state = false;
    let body = _.pick(req.body, ['state']);

    const userDel = await userService.softDeleteUser(req, res, body, idUser);
}

module.exports = {
    getUsers,
    getUserById,
    postCreateUser,
    updateUserPassword,
    updateUser,
    hardDeleteUser,
    softDeleteUser
}