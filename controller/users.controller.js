const usersModel = require('../model/users.model');
const argon2 = require('argon2');
const usersController = {
    get: async (req, res) => {
        try {
            const users = await usersModel.get();
            return res.status(200).send({message: 'success get all data users!', data: users});
        } catch (error) {
            return res.status(500).send({message: 'failed get all data!', error: error.message});
        }
    },

    store: async (req, res) => {
        const {name, email, password, role, username} = req.body;
        if(!name || !email || !password || !role || !username) {
            return res.status(400).send({message: 'evriting coloms has required!'});
        } else {
            try {
                const hash = await argon2.hash(req.body.password);
                const request = {
                    ...req.body,
                    password: hash
                }
                const user = await usersModel.store(request);
                return res.status(201).send({message: 'success creat data users', data: request});
            } catch (error) {
                return res.status(500).send({message: 'failed create data users!', error: error.message});
            }
        }
    },

    update: async (req, res) => {
        const {name, email, password, role, username} = req.body;
        if(!name || !email || !password || !role || !username) {
            return res.status(400).send({message: 'evriting coloms has required!'});
        } else {
            try {
                const hash = await argon2.hash(req.body.password);
                const request = {
                    ...req.body,
                    ...req.params,
                    password: hash
                }
                const user = await usersModel.update(request);
                return res.status(201).send({message: 'success update data users!', data: request})
            } catch (error) {
                return res.status(error.status).send({message: 'failed update data users', error: error.message});
            }
        }
    },

    dump: async (req, res) => {
        try {
            const {id} = req.params;
            const user = await usersModel.dump(id);
            return res.status(200).send({message: `success delete data with id ${id}`});
        } catch (error) {
            return res.status(error.status).send({message: 'failed delet data!', error: error.message});
        }
    }
}

module.exports = usersController;