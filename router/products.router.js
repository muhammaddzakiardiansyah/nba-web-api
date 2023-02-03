const express = require('express');
const route = express();
const productsContrller = require('../controller/products.controller');
const formUpload = require('../helper/formUpload');

route.get('/', productsContrller.get);
route.post('/', formUpload.single('img'), productsContrller.store);
route.put('/:id', productsContrller.update);
route.delete('/:filename', productsContrller.dump);

module.exports = route;