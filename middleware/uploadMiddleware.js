const multer = require('multer');
const storage = require('../config/multer');

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];


const uploadMiddleware = multer({
    storage,
    fileFilter: async (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetype = file.mimetype;
        if (!extensionWhiteList.includes(extension) || !mimetypeWhiteList.includes(mimetype)) {
            return cb(null, false);
        }
        return cb(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    },
});

module.exports = uploadMiddleware;
