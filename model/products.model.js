const db = require('../helper/config');
const {unlink} = require('node:fs');
const { resolve } = require('node:path');
const productsModel = {
    get: (req, res) => {
        return new Promise( (resolve, reject) => {
            db.query('SELECT * FROM products', (err, result) => {
                if(err) {
                    return reject({message: err});
                } else {
                    return resolve(result);
                }
            });
        });
    },
    store: (request) => {
        const {nama, deskripsi, img, harga} = request;
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO products (nama, deskripsi, img, harga) VALUES ('${nama}', '${deskripsi}', '${img}', '${harga}')`, (err, result) => {
                if(err) {
                    return reject(err);
                }
                return resolve(result) ;
            });
        })
    },
    update: (request) => {
        const {id} = request;
        const {nama, deskripsi, img, harga} = request;
        return new Promise( (resolve, reject) => {
            db.query(`SELECT * FROM products WHERE id='${id}'`, (err, resultGet) => {
                unlink(`public/uploads/${resultGet[0].img}`, (err) => {
                    if(err) console.log(err);
                });
                if(!err) {
                    db.query(`UPDATE products SET nama='${nama}', deskripsi='${deskripsi}', img='${img}', harga='${harga}' WHERE id='${id}'`, (err, result) => {
                        if(err) {
                            return reject(err);
                        }
                        return resolve(result);
                    });
                }
            });
        });
    },
    dump: (request) => {
        const {id} = request;
        return new Promise( (resolve, reject) => {
            db.query(`SELECT * from products WHERE id='${id}'`, (err, resultGet)=> {
                unlink(`public/uploads/${resultGet[0].img}`, (err) => {
                    if(err) console.log(err);
                });
                if(!err) {
                    db.query(`DELETE FROM products WHERE id=${id}`, (err, result) => {
                        if(err) {
                            return reject({message: `gagal menghapus produk dengan id ${id}`, error: err.message});
                        }
                        return resolve({message: `berhasil menghapus produk dengan id ${id}`, data: resultGet[0]}); 
                    })
                }   
            })
        });
    }
}

module.exports = productsModel;