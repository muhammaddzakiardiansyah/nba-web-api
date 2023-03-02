const express = require('express');
const saldo = express();
const saldoController = require('../controller/saldo.controller');

saldo.get('/', saldoController.get);
saldo.post('/:id', saldoController.add);

module.exports = saldo;
