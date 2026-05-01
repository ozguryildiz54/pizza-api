"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection');
/* ------------------------------------------------------- */

const pizzaSizes = {
    Small: 'Small',
    Medium: 'Medium',
    Large: 'Large',
    XLarge: 'XLarge'
}

const orderSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    pizzaId: {
        type: Schema.Types.ObjectId,
        ref: "Pizza",
        required: true
    },

    size: {
        type: String,
        trim: true,
        // enum: ['Small', 'Medium', 'Larger', 'XLarge'],
        enum: Object.values(pizzaSizes),
        default: 'Medium'
    },

    quantity: {
        type: Number,
        default: 1
    },

    price: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        default: function () { return this.quantity * this.price; }, // create
        transfrom: function () { return this.quantity * this.price; }, // update
    }

}, { collection: 'orders', timestamps: true });


module.exports = model('Order', orderSchema);