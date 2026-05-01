"use strict"
/* -------------------------------------------------------
        | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

// Multer Middleware (Upload)
// yarn add multer

const multer = require('multer');

module.exports = multer({
    // dest: './uploads'
    storage: multer.diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
            // console.log(req);
            // console.log(file);
            // cb(null, file.originalname)
            cb(null, Date.now() + '_' + file.originalname)
        }
    })
});