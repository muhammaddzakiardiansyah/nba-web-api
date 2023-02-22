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

    posts: async (req, res) => {
        try {
            const products = await productsModel.posts();
            return res.status(200).send({message: 'success get all data posts', data: products});
        } catch (error) {
            return res.status(500).send({message: 'failed get all posts', error: error});
        }
    },

    store: async (req, res) => {
        const {nama, harga, deskripsi, users_id} = req.body
        if(!nama || !req.file || !harga || !deskripsi || !users_id) {
            if(typeof req.file != "undefined") {
                unlink(`public/uploads/${req.file.filename}`,(err)=> {
                    if(err) console.log('file tidak ada.')
                });
            }
            return res.status(400).send({message: 'semua kolom harus diisi!'})
        } else {
            const request = {
                ...req.body,
                img: req.file.filename
            }
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
        const {nama, harga, deskripsi, users_id} = req.body
        if(!nama || !req.file || !harga || !deskripsi || !users_id) {
            if(typeof req.file != "undefined") {
                unlink(`public/uploads/${req.file.filename}`,(err)=> {
                    if(err) console.log('file tidak ada.')
                });
            }
            return res.status(400).send({message: 'semua kolom harus diisi!'})
        } else {
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
        }
    },
    dump: async (req, res) => {
        if(!req.params.id) {
            return res.status(400).send({message: 'data belum pernah dibuat!'});
        } else {
            try {
                const {id} = req.params;
                const result = await productsModel.dump(id);
                return res.status(200).send({
                    message:result
                });
            } catch (error) {
                return res.status(error.status ?? 500).send(error);
            }
        }
        
    }
}

module.exports = productsContrller;