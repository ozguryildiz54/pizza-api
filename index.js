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

// HomePath: JSON for API consumers, HTML landing for browsers
app.get('/', (req, res) => {
    if (req.accepts('html')) {
        return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Pizza API | Ozgur Yildiz</title>
<meta property="og:title" content="Pizza API, a backend project by Ozgur Yildiz" />
<meta property="og:description" content="The back end of a pizza ordering system: secure login, menu and order management, image uploads and email. Live demo with interactive API docs." />
<meta property="og:image" content="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=630&fit=crop" />
<meta property="og:url" content="https://ozguryildiz-pizza-api.vercel.app" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Pizza API, a backend project" />
<meta name="twitter:description" content="The back end of a pizza ordering system, with interactive API docs." />
<meta name="twitter:image" content="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=630&fit=crop" />
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:linear-gradient(135deg,#ff6b35 0%,#c1272d 100%);min-height:100vh;padding:2rem 1rem;color:#1a1a1a}
  .container{max-width:760px;margin:0 auto;background:white;border-radius:16px;padding:2.5rem;box-shadow:0 20px 60px rgba(0,0,0,.3)}
  h1{font-size:2.25rem;margin-bottom:.5rem;line-height:1.15}
  .subtitle{color:#555;margin-bottom:1.75rem;font-size:1.05rem;line-height:1.55}
  .badge{display:inline-block;background:#16a34a;color:white;padding:.2rem .7rem;border-radius:999px;font-size:.8rem;font-weight:600;margin-left:.4rem;vertical-align:middle}
  .primary-btn{display:block;text-align:center;background:#c1272d;color:white;text-decoration:none;font-weight:700;font-size:1.05rem;padding:1rem 1.5rem;border-radius:10px;transition:transform .15s,box-shadow .15s}
  .primary-btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(193,39,45,.35)}
  .creds-line{text-align:center;color:#555;font-size:.9rem;margin:.85rem 0 2rem}
  .creds-line code{background:#f3f4f6;padding:.12rem .45rem;border-radius:4px;font-size:.85rem}
  .section-title{font-size:1.15rem;margin-bottom:1rem;color:#c1272d}
  .feature-list{list-style:none;margin-bottom:2rem}
  .feature-list li{padding:.55rem 0 .55rem 1.6rem;position:relative;color:#444;line-height:1.5;border-bottom:1px solid #f0f0f0}
  .feature-list li:last-child{border-bottom:none}
  .feature-list li:before{content:"✓";position:absolute;left:0;color:#16a34a;font-weight:700}
  .feature-list strong{color:#1a1a1a}
  .divider{border:none;border-top:1px solid #e5e7eb;margin:2rem 0}
  .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.5rem}
  .card{background:#f3f4f6;padding:1.25rem;border-radius:8px;text-decoration:none;color:inherit;transition:transform .15s,box-shadow .15s;display:block}
  .card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.1)}
  .card .label{font-weight:700;color:#c1272d;margin-bottom:.25rem}
  .card .desc{font-size:.85rem;color:#555}
  .dev-note{color:#6b7280;font-size:.85rem;margin-bottom:1rem}
  .dev-note code{background:#f3f4f6;padding:.12rem .45rem;border-radius:4px}
  .dev-note a{color:#c1272d}
  .endpoints{background:#1f2937;color:#e5e7eb;padding:1.25rem 1.5rem;border-radius:8px;font-family:"SF Mono",Consolas,monospace;font-size:.85rem;line-height:1.7;overflow-x:auto}
  .endpoints span.m{color:#fbbf24}
  .endpoints span.p{color:#60a5fa}
  footer{margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e5e7eb;color:#6b7280;font-size:.85rem;text-align:center}
  footer a{color:#c1272d}
</style>
</head>
<body>
  <div class="container">
    <h1>🍕 Pizza API <span class="badge">Live</span></h1>
    <p class="subtitle">The back end of a pizza ordering system. It handles the menu, customer orders, accounts and notifications behind a secure login.</p>

    <a class="primary-btn" href="/documents/swagger">▶  Explore the API</a>
    <p class="creds-line">Demo login: <code>demo@demo.com</code> / <code>Demo1234!</code> &nbsp; (use these in the Swagger "Authorize" box)</p>

    <h2 class="section-title">What this project shows</h2>
    <ul class="feature-list">
      <li><strong>Secure login</strong> with role-based access for admin and customer users.</li>
      <li><strong>Menu management</strong> for pizzas and toppings, including image uploads.</li>
      <li><strong>Order placement and tracking</strong> tied to each customer account.</li>
      <li><strong>Email notifications</strong> for account and order events.</li>
      <li><strong>Interactive API documentation</strong> built with Swagger and Redoc.</li>
    </ul>

    <hr class="divider"/>

    <h2 class="section-title">For developers</h2>
    <div class="grid">
      <a class="card" href="/documents/swagger"><div class="label">📘 Swagger UI</div><div class="desc">Interactive API explorer</div></a>
      <a class="card" href="/documents/redoc"><div class="label">📕 Redoc</div><div class="desc">API reference</div></a>
      <a class="card" href="https://github.com/yldzozgur/pizza-api"><div class="label">⌨ Source code</div><div class="desc">github.com/yldzozgur</div></a>
    </div>

    <p class="dev-note">Demo credentials for direct API calls: <code>demo@demo.com</code> / <code>Demo1234!</code> &nbsp; OpenAPI spec: <a href="/documents/json">/documents/json</a></p>

    <div class="endpoints">
<span class="m">POST</span>   <span class="p">/auth/login</span>           Login, returns JWT + refresh token
<span class="m">GET</span>    <span class="p">/pizzas</span>               List pizzas (public)
<span class="m">POST</span>   <span class="p">/pizzas</span>               Create pizza (admin)
<span class="m">GET</span>    <span class="p">/toppings</span>             List toppings (public)
<span class="m">GET</span>    <span class="p">/orders</span>               List orders (auth)
<span class="m">POST</span>   <span class="p">/orders</span>               Place order (auth)
<span class="m">GET</span>    <span class="p">/users</span>                List users (admin)
    </div>

    <footer>
      Built by <a href="https://github.com/yldzozgur">Ozgur Yildiz</a> · Node + Express · MongoDB Atlas · deployed on Vercel
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