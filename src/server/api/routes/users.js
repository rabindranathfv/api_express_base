const express = require('express');
const UserModel = require('../../models/users');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const userCtrl = require('../../controllers/user.ctrl');
const { getUsers, getUserById, createUsers } = require('../../services/user.service');
const saltRounds = 10;

const app = express();

/* checkToken */
app.get('/users', userCtrl.getUsers);

/* checkToken, */
app.get('/users/:id', userCtrl.getUserById);

/* [checkToken, checkAdMinRole] */
app.post('/users', userCtrl.postCreateUser);

/* checkToken */
app.put('/users/password', userCtrl.updateUserPassword);

/* [checkToken, checkAdMinRole], */
app.put('/users/:id', userCtrl.updateUser);

/* hard delete */
/* [checkToken, checkAdMinRole], */
app.delete('/users/:id', (req, res) => {
    console.log(` Delete Users - hard delete `);
    let idUser = req.params.id;

    UserModel.findByIdAndRemove(idUser, (err, userDelete) => {
        console.log('*** User ****', userDelete);
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problems with users hard delete`,
                err
            });
        }
        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User does not exist'
                }
            });
        }
        res.json({
            ok: true,
            message: 'user delete sucessfully',
            user: userDelete
        });
    });
});

/* soft delete */
/* checkToken */
app.delete('/users/2/:id', (req, res) => {
    console.log(` delete User - soft delete `);
    let idUser = req.params.id;
    req.body.state = false;
    let body = _.pick(req.body, ['state']);

    UserModel.findByIdAndUpdate(idUser, body, { new: true, runValidators: true, context: 'query' }, (err, userDelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problems with users soft delete`,
                err
            });
        }

        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User does not exist'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Update user sucessfully',
            user: userDelete
        });
    });
});

module.exports = app;