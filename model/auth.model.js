const { rejects } = require('assert');
const { resolve } = require('path');
const db = require('../helper/config');

const authModel = {
    register: (request) => {
        const {name, email, password, role, username} = request;
        return new Promise( (resolve, rejects) => {
            db.query(`INSERT INTO users (name, email, password, role, username) VALUES ('${name}', '${email}', '${password}', '${role}', '${username}')`, (err, result) => {
                if(err) {
                    return rejects(err);
                } else {
                    return resolve(result);
                }
            });
        });
        
    },
    login: (request) => {
        const {username, email} = request;
        console.log(request)
        return new Promise( (resolve, rejects) => {
            db.query(`SELECT * FROM users WHERE username='${username}' OR email='${email}'`, (err, result) => {
                if(err) {
                    return rejects(err);
                } else {
                    return resolve(result[0]);
                }
            });
        });
    }
}

module.exports = authModel;