# api_express_base

Boilerplate based API Structure projects for nodeJs/Express. Include mongoDB

+ always use camelCase
+ ES6, ES7 Javascript standards
+ check [angular style](https://angular.io/guide/styleguide) guide if you want more details
+ all code must be in english!

### Information Important

1. [Project structure](#projectstructure)
2. [Public](#public)
3. [Server](#server)
4. [Uploads](#upload)
5. [Tests](#test)
6. [Services](#services)

## Project Structure
<a name="projectstructure"/>

The structure of this project defined by folders with specific purpose

```
.
├── ...
├── src                                         
│   ├── public                      # public files
│   ├── server                  # main source code folder
│        ├── api                  # api rest
│        ├── assets               # assets
│     ├── config                  # config files
│     ├── controllers             # controlers
│     ├── models                  # db models
│     ├── services                # services
│     ├── utils                   # utilies
│   ├── Uploads                   # uploads files
└──...
```

## Public
<a name="public"/>
We store public files in this folder

## Server
<a name="server"/>

We have all the logic from API REST main center in folder  `api` and `assets`. The api folder is divided by middelware folder `midleware` and `routes`.

for routes we use a main file for index all routes in `indexRoutes.js` and use exports grabs the real route for that endpoint

```javascript
const express = require('express');

const app = express();

app.use(require('./users'));
app.use(require('./login'));
app.use(require('./category'));
app.use(require('./product'));
app.use(require('./upload'));
app.use(require('./images'));

module.exports = app;
```
an example of /users endpoints. in this file we use middelwares and call controlers file and make validations if we need it

```javascript
const express = require('express');
const userCtrl = require('../../controllers/user.ctrl');
const { checkToken, checkAdMinRole } = require('../middleware/auth');

const app = express();

app.get('/users', checkToken, userCtrl.getUsers);

app.get('/users/:id', checkToken, userCtrl.getUserById);

app.post('/users', [checkToken, checkAdMinRole], userCtrl.postCreateUser);

app.put('/users/password', checkToken, userCtrl.updateUserPassword);

app.put('/users/:id', [checkToken, checkAdMinRole], userCtrl.updateUser);

app.delete('/users/:id', [checkToken, checkAdMinRole], userCtrl.hardDeleteUser);

app.delete('/users/2/:id', checkToken, userCtrl.softDeleteUser);

module.exports = app;
```

## upload
<a name="upload"/>

this exist into `upload` folder, we are going to save here all files the user upload into our API

## test
<a name="test"/>

we apply this practice of all our files into our API, using jest as library.

## Services
<a name="services"/>

The most important here is make the login in our API.

```javascript
'use strict';

const Debug = require('debug');
const _ = require('underscore');

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
  UserModel.findByIdAndUpdate(userId, ObjectUser, { new: true, runValidators: true, useFindAndModify: 'false' })
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

const updateUserPassword = async(req, res, cleanBody, userId) => {

  UserModel.findByIdAndUpdate(userId, cleanBody, { new: true, runValidators: true, context: 'query', useFindAndModify: 'false' }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: `problem with users updated by Id`,
        err
      });
    }
    res.json({
      ok: true,
      message: 'Update user password sucessfully',
    });
  });
}

const updateUser = async(req, res, objUser, UserId) => {
  UserModel.findByIdAndUpdate(UserId, objUser, { new: true, runValidators: true, context: 'query', useFindAndModify: 'false' }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: `problem with users updated by Id`,
        err
      });
    }
    res.json({
      ok: true,
      message: 'Update user sucessfully',
      user: userDB
    });
  });
}

const hardDeleteUser = async(req, res, userId) => {
  UserModel.findByIdAndRemove(userId, (err, userDelete) => {
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
}

const softDeleteUser = async(req, res, objUser, userId) => {
  UserModel.findByIdAndUpdate(userId, objUser, { new: true, runValidators: true, context: 'query' }, (err, userDelete) => {
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
```

+ checkout good practices
