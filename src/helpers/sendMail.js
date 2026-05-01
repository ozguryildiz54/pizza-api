"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// sendMail(to, subject, message)

const nodemailer = require('nodemailer');

module.exports = function sendMail(to, subject, message) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mail@example.com',
            pass: 'your-app-password'
        }
    });

    transporter.sendMail({
        from: 'mail@example.com',
        to,
        subject,
        text: message,
        html: message
    }, function (error, success) {
        success ? console.log('Success:', success) : console.log('Error:', error)
    });


}