const db = require('../helper/config');

const saldoModel = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM checkout', (err, result) => {
        if (err) {
          return reject(err);
        } else {
          let data = result.map((item) => {
            return {
              ...item,
              products: JSON.parse(item.products),
            };
          });
          return resolve(data);
        }
      });
    });
  },

  add: (request) => {
    const { id, saldo } = request;
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id='${id}'`, (err, resultGet) => {
        let createSaldo = resultGet[0].saldo + saldo;
        if (!err) {
          db.query(`UPDATE users SET saldo='${createSaldo}' WHERE id='${id}'`, (err, resultUpdate) => {
            if (!err) {
              db.query(`INSERT INTO top_up (user_id, topUp) VALUES ('${resultGet[0].id}', '${saldo}')`, (err, resultTopUp) => {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(resultGet);
                }
              });
            }
          });
        }
      });
    });
  },
};

module.exports = saldoModel;
