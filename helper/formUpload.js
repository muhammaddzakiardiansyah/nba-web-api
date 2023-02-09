const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
    }
});

const formUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(req)
        let formatType = path.extname(file.originalname);
        if(formatType === ".png" || ".jpg" || ".jpeg") {
            cb(null, true);
        }
    }
})

module.exports = formUpload;
