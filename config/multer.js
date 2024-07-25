const multer = require('multer');
const path = require("path");
const { v4: uuidV4 } = require('uuid');

const tempDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidV4()}${file.originalname}`);
    },
  });


module.exports = storage