const express = require('express');
const route = express();
const productsContrller = require('../controller/products.controller');
const formUpload = require('../helper/formUpload');

route.get('/', productsContrller.get);
route.post('/', formUpload.single('img'), productsContrller.store);
route.put('/:id', formUpload.single('img'), productsContrller.update);
route.delete('/:id', productsContrller.dump);

module.exports = route;