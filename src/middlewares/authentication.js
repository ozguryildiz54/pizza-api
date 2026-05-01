"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Token = require('../models/token');
const jwt = require('jsonwebtoken');
const CustomError = require('../helpers/customError');

module.exports = async (req, res, next) => {

    req.user = null;

    const auth = req?.headers?.authorization; // Token ...tokenKey... || Bearer ...accessKey...
    const tokenArr = auth ? auth.split(' ') : null; // ['Token', '...tokenKey...'] || ['Bearer', '...accessKey...']

    if (tokenArr && tokenArr[0] === 'Token') { // Simple Token
        const tokenData = await Token.findOne({ token: tokenArr[1] }).populate('userId');

        req.user = tokenData ? tokenData.userId : null;

    } else if (tokenArr && tokenArr[0] === 'Bearer') {

        // jwt.verify(jwt, secretKey, cb)
        jwt.verify(tokenArr[1], process.env.ACCESS_KEY, (error, accessData) => {
            // console.log('error:', error);
            // console.log('accessData:', accessData);

            // if (error) {
            //     throw new CustomError('JWT Error : ' + error.message, 401);
            // }

            if (error) next(new CustomError('JWT Error : ' + error.message, 401));

            req.user = accessData ? accessData : null

        });

    }

    next();
}