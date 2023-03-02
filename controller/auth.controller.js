const authModel = require('../model/auth.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
      const hash = await argon2.hash(req.body.password);
      const request = {
        ...req.body,
        password: hash,
      };
      const result = await authModel.register(request);
      return res.status(201).send({ message: 'User baru berhasil ditambahkan', data: request });
    } catch (error) {
      return res.status(500).send({ message: 'gagal menambah data', error: error.message });
    }
  },
  login: async (req, res) => {
    const request = {
      ...req.body,
    };
    try {
      const result = await authModel.login(request);
      const verifyPassword = await argon2.verify(result.password, request.password);
      if (verifyPassword) {
        const token = jwt.sign({ id: result.id, role: result.role }, 'wokawokawok');
        return res.status(201).send({
          message: 'success login!',
          datauser: {
            token,
            id: result.id,
            name: result.name,
          },
        });
      } else {
        return res.status(400).send({ message: 'failed login!', datauser: 'Username/Password Salah.' });
      }
    } catch (error) {
      return res.status(500).send({ message: 'failed login!', datauser: error.message });
    }
  },
};

module.exports = authController;
