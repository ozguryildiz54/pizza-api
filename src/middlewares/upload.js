"use strict"

// Multer Middleware (Upload)
// yarn add multer

const multer = require('multer');
const fs = require('node:fs');
const path = require('node:path');

const isServerless = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const uploadDir = isServerless ? '/tmp/uploads' : './uploads';

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

module.exports = multer({
    storage: multer.diskStorage({
        destination: uploadDir,
        filename: function (req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname)
        }
    })
});