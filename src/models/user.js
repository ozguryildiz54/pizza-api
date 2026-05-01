"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose: { Schema, model } } = require('../configs/dbConnection')
const passwordEncrypt = require('../helpers/passwordEncrypt');
/* ------------------------------------------------------- */

const userSchema = new Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        set: passwordEncrypt
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        validate: [
            (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            "Please fill a valid email address."
        ]
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

}, { collection: 'users', timestamps: true });

module.exports = model('User', userSchema);