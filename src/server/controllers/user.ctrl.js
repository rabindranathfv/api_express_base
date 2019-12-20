'use stric'

const userService = require('../services/user.service');

const Debug = require('debug');
const debug = new Debug('backend:controller:user');

const getUsers = async() => {

}

const getUsersById = async() => {

}

const postCreateUser = async(req, res) => {
    const userData = req.body;
    console.log('create User Ctrl', userData);
    const user = await userService.createUser(userData, req, res);
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