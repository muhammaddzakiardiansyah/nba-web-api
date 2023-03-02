const saldoModel = require('../model/saldo.model');

const saldoController = {
  get: async (req, res) => {
    try {
      const saldos = await saldoModel.get();
      return res.status(200).send({ message: 'success get all transaksi', data: saldos });
    } catch (error) {
      return res.status(500).send({ message: 'failed get all transaksi!', error: error });
    }
  },

  add: async (req, res) => {
    try {
      const request = {
        ...req.body,
        ...req.params,
      };
      const saldos = await saldoModel.add(request);
      return res.status(201).send({
        message: 'success create saldo!',
        topUp: {
          ...req.body,
          user_id: saldos[0].id,
        },
      });
    } catch (error) {
      return res.status(500).send({ message: 'failed create saldo!', error: error });
    }
  },
};

module.exports = saldoController;
