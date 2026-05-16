"use strict"
// sendMail(to, subject, message)

const nodemailer = require('nodemailer');

module.exports = function sendMail(to, subject, message) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        text: message,
        html: message
    }, function (error, success) {
        success ? console.log('Success:', success) : console.log('Error:', error)
    });

}
