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

// HomePath — JSON for API consumers, HTML landing for browsers
app.get('/', (req, res) => {
    if (req.accepts('html')) {
        return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Pizza API — Ozgur Yildiz</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: linear-gradient(135deg, #ff6b35 0%, #c1272d 100%); min-height: 100vh; padding: 2rem 1rem; color: #1a1a1a; }
  .container { max-width: 800px; margin: 0 auto; background: white; border-radius: 16px; padding: 2.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
  h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .subtitle { color: #666; margin-bottom: 2rem; }
  .badge { display: inline-block; background: #16a34a; color: white; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.85rem; font-weight: 600; margin-left: 0.5rem; vertical-align: middle; }
  .creds { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
  .creds strong { display: block; margin-bottom: 0.5rem; color: #78350f; }
  .creds code { background: white; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.95rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .card { background: #f3f4f6; padding: 1.25rem; border-radius: 8px; text-decoration: none; color: inherit; transition: transform 0.15s, box-shadow 0.15s; display: block; }
  .card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
  .card .label { font-weight: 700; color: #c1272d; margin-bottom: 0.25rem; }
  .card .desc { font-size: 0.85rem; color: #555; }
  .endpoints { background: #1f2937; color: #e5e7eb; padding: 1.25rem 1.5rem; border-radius: 8px; font-family: "SF Mono", Consolas, monospace; font-size: 0.85rem; line-height: 1.7; overflow-x: auto; }
  .endpoints span.m { color: #fbbf24; }
  .endpoints span.p { color: #60a5fa; }
  footer { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 0.85rem; text-align: center; }
  footer a { color: #c1272d; }
</style>
</head>
<body>
  <div class="container">
    <h1>🍕 Pizza API <span class="badge">Live</span></h1>
    <p class="subtitle">REST API for a pizza ordering system — Express + MongoDB + JWT + Multer + Nodemailer + Swagger.</p>

    <div class="creds">
      <strong>🔑 Demo Login</strong>
      Email: <code>demo@demo.com</code> &nbsp; Password: <code>Demo1234!</code> &nbsp; Role: <code>admin</code><br>
      <small style="color:#92400e">Use these in Swagger UI's Authorize dialog or POST to /auth/login</small>
    </div>

    <div class="grid">
      <a class="card" href="/documents/swagger"><div class="label">📘 Swagger UI</div><div class="desc">Interactive API explorer</div></a>
      <a class="card" href="/documents/redoc"><div class="label">📕 Redoc</div><div class="desc">Beautiful API reference</div></a>
      <a class="card" href="/documents/json"><div class="label">📄 OpenAPI JSON</div><div class="desc">Raw spec</div></a>
      <a class="card" href="/pizzas"><div class="label">🍕 GET /pizzas</div><div class="desc">5 sample pizzas</div></a>
      <a class="card" href="/toppings"><div class="label">🌶 GET /toppings</div><div class="desc">8 toppings</div></a>
      <a class="card" href="https://github.com/ozguryildiz54/pizza-api"><div class="label">⌨ Source Code</div><div class="desc">github.com/ozguryildiz54</div></a>
    </div>

    <div class="endpoints">
<span class="m">POST</span>   <span class="p">/auth/login</span>           Login → JWT + refresh token
<span class="m">POST</span>   <span class="p">/auth/refresh</span>         Refresh JWT
<span class="m">GET</span>    <span class="p">/pizzas</span>               List pizzas (public)
<span class="m">POST</span>   <span class="p">/pizzas</span>               Create pizza (admin)
<span class="m">PUT</span>    <span class="p">/pizzas/:id</span>           Update pizza (admin)
<span class="m">DELETE</span> <span class="p">/pizzas/:id</span>           Delete pizza (admin)
<span class="m">GET</span>    <span class="p">/toppings</span>             List toppings (public)
<span class="m">GET</span>    <span class="p">/orders</span>               List orders (auth)
<span class="m">POST</span>   <span class="p">/orders</span>               Place order (auth)
<span class="m">GET</span>    <span class="p">/users</span>                List users (admin)
    </div>

    <footer>
      Built by <a href="https://github.com/ozguryildiz54">Ozgur Yildiz</a> · Deployed on Vercel · MongoDB Atlas
    </footer>
  </div>
</body>
</html>`);
    }
    res.json({
        error: false,
        message: 'Welcome to PIZZA API',
        demo: { email: 'demo@demo.com', password: 'Demo1234!', role: 'admin' },
        docs: { swagger: "/documents/swagger", redoc: "/documents/redoc", json: "/documents/json" },
        user: req.user,
    });
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