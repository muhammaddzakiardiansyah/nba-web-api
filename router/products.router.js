const express = require('express');
const route = express();
const productsContrller = require('../controller/products.controller');
const formUpload = require('../helper/formUpload');
const verifyToken = require('../helper/verifyToken');
// route.post('/', function (req, res) {
//     upload(req, res, function (err) {
//     const {nama, harga, deskripsi} = req.body
//     if(!nama && !req.file && !harga && !deskripsi) {
//         console.log('lanjuuut')
//         return res.status(400).send({message: 'semua kolom harus diisi!'})
//         // return next()
//     }
//       if (err instanceof multer.MulterError) {
//         return res.status(400).send({message: 'semua kolom harus diisi!'})
//       } else if (err) {
//         return res.status(400).send({message: 'semua kolom harus diisi!'})
//       }
  
//       return productsContrller.store(req, res)
//     })
//   })

// const mapMulterErrorToValidationError = (errorMessages) => {
//     return async (error, request, response, next) => {
//       if (error instanceof multer.MulterError) {
//         await checkSchema({
//           [error.field]: {
//             custom: {
//               errorMessage: errorMessages[error.code] || error.message
//             }
//           }
//         }).run(request);
//         next();
//       } else {
//         next(error);
//       }
//     };
//   }
route.get('/', productsContrller.get);
route.post('/', verifyToken,formUpload.single('img'),  productsContrller.store);
route.put('/:id', verifyToken,formUpload.single('img'), productsContrller.update);
route.delete('/:id', verifyToken,productsContrller.dump);

module.exports = route;