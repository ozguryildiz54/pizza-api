"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/pizza');
const upload = require('../middlewares/upload');

/* ------------------------------------------------------- *
// Multer Middleware (Upload)
// yarn add multer

const multer = require('multer');

const upload = multer({
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
/* ------------------------------------------------------- */

// URL -> /pizzas

router.route('/')
    .get(list)
    .post(upload.single('image'), create);
// .post(upload.array('image') ,create);
// .post(upload.any(), create);

router.route('/:id').get(read).put(upload.single('image'),update).delete(dlt);

/* ------------------------------------------------------- */
module.exports = router