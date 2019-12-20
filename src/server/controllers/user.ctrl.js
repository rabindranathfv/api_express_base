'use stric'

const userService = require('../services/user.service');

const Debug = require('debug');
const debug = new Debug('backend:controller:user');

const postCreateUser = async(req, res) => {
    const userData = req.body;
    console.log('create User Ctrl', userData);
    const user = await userService.createUser(userData, req, res);
}

module.exports = {
    postCreateUser
}