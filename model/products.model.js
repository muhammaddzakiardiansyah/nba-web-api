const { request } = require("express");

const productsModel = {
    get: (req, res) => {
        return [
            {produk: "sandal",perusahaan: "swalow"},
            {produk: "sandal",perusahaan: "swalow"},
            {produk: "sandal",perusahaan: "swalow"},
            {produk: "sandal",perusahaan: "swalow"},
            {produk: "sandal",perusahaan: "swalow"},
            {produk: "sandal",perusahaan: "swalow"},
            {produk: "sandal",perusahaan: "swalow"},
        ];
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