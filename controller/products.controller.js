const productsModel = require('../model/products.model');
const {unlink} = require('node:fs');
const productsContrller = {
    get: (req, res) => {
        const products = productsModel.get();
        return res.send(products);
    },
    store: (req, res) => {
        const request = {
            ...req.body,
            ...req.file
        }
        const product = productsModel.store(request);
        return res.send(product);
    },
    update: (req, res) => {
        const request = {
            ...req.params,
            ...req.body
        };
        const product = productsModel.update(request);
        return res.send(product);
    },
    dump: (req, res) => {
        const request = {
            ...req.params
        };
        const product = productsModel.dump(request);
        console.log(req.params.filename);
        unlink(`public/uploads/${req.params.filename}`, (err) => {
            if(err) console.log(err);
        });
        return res.send(product);
    }
}

module.exports = productsContrller;