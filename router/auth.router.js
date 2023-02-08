const express = require('express');
const auth = express();

const authController = require('../controller/auth.controller');

auth.post('/login', authController.login);
auth.post('/register', authController.register);

module.exports = auth; 