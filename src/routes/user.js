"use strict"
const router = require('express').Router()
const { list, create, read, update, dlt } = require('../controllers/user');
const upload = require('../middlewares/upload');

/* ------------------------------------------------------- */
// URL -> /users

router.route('/').get(list).post(upload.single('profile'), create);

router.route('/:id').get(read).put(update).delete(dlt);

/* ------------------------------------------------------- */
module.exports = router