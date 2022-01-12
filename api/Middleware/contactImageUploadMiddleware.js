const multer = require('multer')
const path = require("path")


//contact image upload
const contactImageUploadMiddleware = (req, res, next) => {
    //contact image upload setting
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'images/')
        },
        filename: function (req, file, cb) {
            const fileExt = path.extname(file.originalname)
            const fileName = file.originalname.replace(fileExt, "").split(" ").join("_") + "_" + Date.now()
            cb(null, fileName + fileExt)
        }
    })

    //image upload
    const upload = multer({
        storage: storage,
        limits: {fileSize: 1000000},
        fileFilter: function (_req, file, cb) {
            // Allowed ext
            const filetypes = /jpeg|jpg|png|gif/;
            // Check ext
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            // Check mime
            const mimetype = filetypes.test(file.mimetype);

            if (mimetype && extname) {
                return cb(null, true);
            } else {
                const response = {}
                response.mimeType = false
                response.message = "images only"
                cb(response);
            }
        }
    }).single("pf")

    //error handle
    upload(req, res, err => {
        if (err) {
            res.send(err)
        } else {
            next()
        }
    })
}

module.exports = contactImageUploadMiddleware