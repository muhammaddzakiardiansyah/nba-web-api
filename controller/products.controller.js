const productsModel = require('../model/products.model');
const {unlink} = require('node:fs');
const productsContrller = {
    get: async (req, res) => {
        try {
            const result = await productsModel.get();
            return res.status(200).send({
                message: "Berhasil menampilkana semua data",
                data: result
            });
        } catch (error) {
            return res.status(500).send({
                message: error.message
            })
        }
    },
    store: async (req, res) => {
        const request = {
            ...req.body,
            img: req.file.filename
        }
        console.log(res)
        try {
            const result = await productsModel.store(request);
            return res.status(201).send({
                message: "Berhasil Nambah Data",
                data: {
                    ...request,
                    db: result
                }
            });
        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }
        // productsModel.store(request).then((result)=> {
        //     return res.status(201).send({
        //         message: "Berhasil Nambah Data",
        //         data: request
        //     });
        // }).catch((awok)=> {
        //     return res.send({message: awok.message})
        // })
    },
    update: async (req, res) => {
        try {
            const request = {
                ...req.body,
                id: req.params.id,
                img: req.file.filename
            };
            const result = await productsModel.update(request);
            return res.status(201).send({
                message: `berhasil update data dengan id ${request.id}`,
                data: {
                    ...request,
                    db: result
                }
            });
        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }
    },
    dump: async (req, res) => {
        try {
            const request = {
                ...req.params
            };
            const result = await productsModel.dump(request);
            return res.status(200).send({
                message:result
            });
        } catch (error) {
            return res.status(500).send({
                message: error.message
            });
        }
    }
}

module.exports = productsContrller;