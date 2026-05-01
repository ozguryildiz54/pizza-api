"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
/* ------------------------------------------------------- */

const pizzaSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    image: String,

    price: {
        type: Number,
        required: true
    },

    toppingIds: [{
        type: Schema.Types.ObjectId,
        ref: "Topping"
    }]

}, { collection: 'pizzas', timestamps: true });

module.exports = model('Pizza', pizzaSchema);