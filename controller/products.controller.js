const productsModel = require('../model/products.model');
const {unlink} = require('node:fs');
const productsContrller = {
    get: (req, res) => {
        return productsModel.get(req.query).then( (result) => {
            return res.status(200).send({message: "success", data: result});
        }).catch( (err) => {
            return res.status(500).send({message: "failed", data: err});
        })
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