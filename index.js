"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose 
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ npm run dev
*/

const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// Nested Query
app.set("query parser", "extended");

// DB Connection:
const { dbConnection } = require('./src/configs/dbConnection');
dbConnection();

/* ------------------------------------------------------- */
//* Middlewares:

// Accept JSON:
app.use(express.json());

// Auhentication:
app.use(require('./src/middlewares/authentication'));

// Query Handler
app.use(require('./src/middlewares/queryHandler'));

// Logger:
app.use(require('./src/middlewares/logger'));

/* ------------------------------------------------------- *
// E-mail
// yarn add nodemailer

const nodemailer = require('nodemailer');

/* Send email with ethereal(fake) email *

// Create test account:
// nodemailer.createTestAccount().then(email => console.log(email));

// {
//   user: 'upci2iybmpq3ohnh@ethereal.email',
//   pass: 'zAkVswH7EmKAmrGKGf',
//   smtp: { host: 'smtp.ethereal.email', port: 587, secure: false }, // send mail
//   imap: { host: 'imap.ethereal.email', port: 993, secure: true }, // receive mail
//   pop3: { host: 'pop3.ethereal.email', port: 995, secure: true }, // receive mail
//   web: 'https://ethereal.email',
//   mxEnabled: false
// }

// Connect to MailServer / (SMTP);
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'upci2iybmpq3ohnh@ethereal.email',
        pass: 'zAkVswH7EmKAmrGKGf'
    }
});

// console.log(transporter);

// Send Mail:
transporter.sendMail({
    from: 'upci2iybmpq3ohnh@ethereal.email',
    to: 'info@clarusway.com,mail@example.com',
    subject: "Hi there",
    text: "Hello there, this is a test mail. Dont consider.",
    html: "<p> <b> Hello there</b>,  this is a test mail. Dont consider. </p>"
}, function (error, success) {
    success ? console.log('Success:', success) : console.log('Error:', error)
});


/* Send email with ethereal(fake) email */

/* Send email with gmail email *

// Google -> AccountHome -> Security -> Two-Step-Verify (make it on) -> App-Passwords (if not showing use this link: https://myaccount.google.com/apppasswords)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mail@example.com',
        pass: 'your-app-password'
    }
});

// transporter.sendMail({
//     from: 'mail@example.com',
//     to: 'mail@example.com',
//     subject: "Hi there",
//     text: "Hello there, this is a test mail. Dont consider.",
//     html: "<p> <b> Hello there</b>,  this is a test mail. Dont consider. </p>"
// }, function (error, success) {
//     success ? console.log('Success:', success) : console.log('Error:', error)
// });

/* Send email with gmail email */

/* Send email with yandex email *

const transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
        user: 'info@yandex.com',
        pass: 'yourPersonelPassword' 
    }
});

transporter.sendMail({
    from: 'info@yandex.com',
    to: 'info@yandex.com',
    subject: "Hi there",
    text: "Hello there, this is a test mail. Dont consider.",
    html: "<p> <b> Hello there</b>,  this is a test mail. Dont consider. </p>"
}, function (error, success) {
    success ? console.log('Success:', success) : console.log('Error:', error)
});

/* Send email with gmail email */

/* ------------------------------------------------------- */
//* Routes:

// HomePath
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to PIZZA API',
        docs: {
            swagger: "/documents/swagger",
            redoc: "/documents/redoc",
            json: "/documents/json",
        },
        user: req.user,
    })
});

// Other path
app.use('/', require('./src/routes'));

// Static Route
// app.use('/images', express.static('./uploads'));
app.use('/uploads', express.static('./uploads'));

// Not found
app.all('/*splat', (req, res) => {
    res.status(404).send({
        error: true,
        message: 'Route not available.'
    })
});

/* ------------------------------------------------------- */

// ErrorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER (skip on serverless):
if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))
}

module.exports = app;

/* ------------------------------------------------------- */
//! Syncronization (must be in commentLine):
// require('./src/helpers/sync')()