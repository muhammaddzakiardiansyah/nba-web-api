const {unlink} = require('node:fs');

unlink('./public/uploads/gambar1.jpg', (err) => {
    console.log(err);
});