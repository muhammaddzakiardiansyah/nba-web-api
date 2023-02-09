const express = require('express');
const route = express();
const productsContrller = require('../controller/products.controller');
const formUpload = require('../helper/formUpload');
const verifyToken = require('../helper/verifyToken');

route.get('/', productsContrller.get);
route.post('/', verifyToken,formUpload.single('img'), productsContrller.store);
route.put('/:id', verifyToken,formUpload.single('img'), productsContrller.update);
route.delete('/:id', verifyToken,productsContrller.dump);

module.exports = route;