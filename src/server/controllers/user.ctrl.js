'use stric'

const userService = require('../services/user.service');
const UserModel = require('../models/users');
const utils = require('../utils/utils');

const Debug = require('debug');
const debug = new Debug('backend:controller:user');


const postCreateUser = async(req, res) => {
    try {
        const userData = req.body;
        console.log('create User routes lvl2', userData);
        const user = await userService.createUser(userData);
        utils.handleResponseSuccess(res, { ok: true, message: 'create users sucessfully', user: user }, 200);
    } catch (e) {
        utils.handleResponseError(res, `problems with users creation`, e, 404);
    }

}


module.exports = {
    postCreateUser
}