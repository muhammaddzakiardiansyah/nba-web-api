const db = require('../helper/config');
const { unlink } = require('node:fs');
const productsModel = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products', (err, result) => {
        if (err) {
          return reject({ message: err });
        } else {
          return resolve(result);
        }
      });
    });
  },

  posts: (req, res) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT products.nama, products.deskripsi, products.img, products.harga, users.name FROM products LEFT JOIN users ON products.users_id=users.id', (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result);
        }
      });
    });
  },

  checkout: (request) => {
    return new Promise((resolve, reject) => {
      const { id } = request;
      const { seller_id = 11, total_payment = 0, products = [] } = request;
      db.query(`SELECT * FROM users WHERE id='${id}'`, (err, resultBuyer) => {
        let outcomeBalanceUser = resultBuyer[0].saldo - total_payment;
        if (!err) {
          let outcomeBalanceUser = resultBuyer[0].saldo - total_payment;
          if (resultBuyer[0].saldo < total_payment) {
            return reject({ message: 'saldo anda tidaklah cukup!', status: 400 });
          }
          db.query(`UPDATE users SET saldo='${outcomeBalanceUser}' WHERE id='${id}'`, (err, afterOutCome) => {
            db.query(`SELECT * FROM users WHERE id='${seller_id}'`, (err, resultSeller) => {
              let incomeBalanceSeller = total_payment + resultSeller[0].saldo;
              db.query(`UPDATE users SET saldo='${incomeBalanceSeller}' WHERE id='${resultSeller[0].id}'`, (err, afterIncome) => {
                db.query(`INSERT INTO checkout (buyer_id, seller_id, total_payment, products) VALUES ('${id}', '${resultSeller[0].id}', '${total_payment}', '${JSON.stringify(products)}')`, (err, lastResult) => {
                  if (err) {
                    return reject(err);
                  } else {
                    return resolve(lastResult);
                  }
                });
              });
            });
          });
        }
      });
    });
  },

  store: (request) => {
    const { nama, deskripsi, img, harga, users_id } = request;
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO products (nama, deskripsi, img, harga, users_id) VALUES ('${nama}', '${deskripsi}', '${img}', '${harga}', '${users_id}')`, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  },
  update: (request) => {
    const { id } = request;
    const { nama, deskripsi, img, harga, users_id } = request;
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE id='${id}'`, (err, resultGet) => {
        if (resultGet.length <= 0) {
          if (typeof img != 'undefined') {
            unlink(`public/uploads/${img}`, (err) => {
              if (err) console.log(err.message);
            });
          }
          return reject({ message: 'data tidak ditemukan', status: 400 });
        }
        unlink(`public/uploads/${resultGet[0].img}`, (err) => {
          if (err) console.log(err);
        });
        if (!err) {
          db.query(`UPDATE products SET nama='${nama}', deskripsi='${deskripsi}', img='${img}', harga='${harga}', users_id='${users_id}' WHERE id='${id}'`, (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          });
        }
      });
    });
  },
  dump: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from products WHERE id='${id}'`, (err, resultGet) => {
        if (resultGet.length <= 0) {
          return reject({ message: `data tidak ditemukan`, data: [], status: 400 });
        }
        unlink(`public/uploads/${resultGet[0].img}`, (err) => {
          if (err) console.log(err.message);
        });
        if (!err) {
          db.query(`DELETE FROM products WHERE id=${id}`, (err, result) => {
            console.log(err);
            if (err) {
              return reject({ message: `gagal menghapus produk dengan id ${id}`, error: err.message });
            }
            return resolve({ message: `berhasil menghapus produk dengan id ${id}`, data: resultGet[0] });
          });
        }
      });
    });
  },
};

module.exports = productsModel;
