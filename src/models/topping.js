"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const toppingSchma = new Schema({

    name: { type: String, trim: true, required: true, unique: true }

}, { timestamps: true });

module.exports = model('Topping', toppingSchma);