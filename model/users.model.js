const db = require('../helper/config');

const usersModel = {
    get: (req, res) => {
        return new Promise( (resolve, reject) => {
            db.query('SELECT users.name, products.id, products.nama, products.deskripsi, products.img, products.harga FROM users RIGHT JOIN products ON users.id=products.users_id', (err, result) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            });
            // db.query('SELECT * FROM users', (err, result) => {
            //     if(err) {
            //         return reject(err.message);
            //     } else {
            //         return resolve(result);
            //     }
            // });
        });
    },

    store: (request) => {
        console.log(request)
        const {name, email, password, role, username} = request;
        return new Promise( (resolve, reject) => {
           db.query(`INSERT INTO users (name, email, password, role, username, users_id) VALUES ('${name}', '${email}', '${password}', '${role}', '${username}')`, (err, result) => {
            if(err) {
                return reject(err.message);
            } else {
                return resolve(result);
            }
           });
        });
    },

    update: (request) => {
        const {name, email, password, role, username, id} = request
        return new Promise( (resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id='${id}'`, (err, resultGet) => {
                console.log(resultGet)
                if(resultGet.length <= 0) {
                    return reject({message: 'data not found!', status: 400});
                }
                if(!err) {
                    db.query(`UPDATE users SET name='${name}', email='${email}', password='${password}', role='${role}', username='${username}' WHERE id='${id}'`, (err, result) => {
                        if(err) {
                            return reject(err.message);
                        } else {
                            return resolve(resultGet);
                        }
                    });
                }
            });
        });
    },

    dump: (id) => {
        return new Promise( (resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id='${id}'`, (err, resultGet) => {
                if(resultGet.length <= 0) {
                    return reject({message: 'data not found!', status: 400});
                }
                if(!err) {
                    db.query(`DELETE FROM users WHERE id='${id}'`, (err, result) => {
                        if(err) {
                            return reject(err.message);
                        } else {
                            return resolve(resultGet);
                        }
                    });
                }
            });
        });
    }
}

module.exports = usersModel;