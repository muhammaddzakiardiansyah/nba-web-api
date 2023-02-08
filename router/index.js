const express = require('express');
const auth = require('./auth.router');
const router = express();
const products = require('./products.router')

router.use('/products', products);
router.use('/auth', auth)

module.exports = router;