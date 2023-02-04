const db = require('../helper/config');
const productsModel = {
    get: (req, res) => {
        db.query('SELECT * FROM products', (err, result) => {
            if(err) {
                return {message: err};
            } else {
                return console.log(result);
            }
        })
    },
    store: (request) => {
        const {produk, perusahaan, originalname} = request;
        return {message: `berhasil menambahn produk ${produk} dari perusahaan ${perusahaan} gambar ${originalname}`};
    },
    update: (request) => {
        const {id} = request;
        const {produk, perusahaan} = request;
        return {message: `berhasil megupdate id ${id} dengan produk ${produk} dari perusahaan ${perusahaan}`};
    },
    dump: (request) => {
        const {filename} = request;
        return {message: `berhasil menghapus produk dengan id ${filename}`};
    }
}

module.exports = productsModel;