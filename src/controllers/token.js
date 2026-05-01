"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Token = require('../models/token');
const CustomError = require('../helpers/customError');

module.exports = {

    list: async (req, res) => {
        // #swagger.ignore = true

        const result = await res.getModelList(Token);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Token),
            result
        });
    },

    create: async (req, res) => {
        // #swagger.ignore = true

        const result = await Token.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {
        // #swagger.ignore = true

        const result = await Token.findById(req.params.id);

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        // #swagger.ignore = true

        const result = await Token.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!result) throw new CustomError('Data is not found.', 404);

        res.status(200).send({
            error: false,
            result
        })
    },

    dlt: async (req, res) => {
        // #swagger.ignore = true

        const result = await Token.deleteOne({ _id: req.params.id });

        if (!result.deletedCount) throw new CustomError('Data is not found or already deleted.', 404);

        res.sendStatus(204);
    },
}