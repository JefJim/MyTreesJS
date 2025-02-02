const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads').replaceAll('\\', '/'));
    },
    filename: function (req, file, cb) {
        
        const ext = path.extname(file.originalname);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
