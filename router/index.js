const express = require('express');
const auth = require('./auth.router');
const router = express();
const products = require('./products.router');
const users = require('./users.router');
const saldo = require('./saldo.router');

router.use('/products', products);
router.use('/auth', auth);
router.use('/users', users);
router.use('/saldo', saldo);

module.exports = router;
