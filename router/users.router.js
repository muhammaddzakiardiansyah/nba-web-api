const express = require('express');
const users = express();
const usersController = require('../controller/users.controller');

users.get('/', usersController.get);
users.post('/', usersController.store);
users.put('/:id', usersController.update);
users.delete('/:id', usersController.dump);

module.exports = users;