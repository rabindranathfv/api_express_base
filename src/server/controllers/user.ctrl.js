'use stric'

const userService = require('../services/user.service');

const Debug = require('debug');
const debug = new Debug('backend:controller:user');

const getUsers = async(req, res) => {
    // route /users?limit=<value>&start=<value>
    console.log(` QueryParams `, req.query);
    let start = req.query.start || 0;
    start = Number(start);
    let limit = req.query.limit || 15;
    limit = Number(limit);
    const users = await userService.getUsers(req, res, start, limit);
}

const getUsersById = async(req, res) => {
    let userId = req.params.id;
    let body = req.body;
    const user = await userService.getUsersById(req, res, body, userId);
}

const postCreateUser = async(req, res) => {
    const userData = req.body;
    console.log('create User Ctrl', userData);
    const user = await userService.createUser(req, res, userData);
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
    getUsers,
    getUsersById,
    postCreateUser,
    updateUserPassword,
    updateUser,
    hardDeleteUser,
    softDeleteUser
}