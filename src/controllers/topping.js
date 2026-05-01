"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Topping = require('../models/topping');
const CustomError = require('../helpers/customError');

module.exports = {

    list: async (req, res) => {
        /* 
            #swagger.tags = ['Toppings']
            #swagger.summary = 'List Toppings'
            #swagger.desription = `
                You can sen query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples usage:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

        const result = await res.getModelList(Topping);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Topping),
            result
        });
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ['Toppings']
            #swagger.summary = 'Create Topping'
        */

        const result = await Topping.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {
        /* 
            #swagger.tags = ['Toppings']
            #swagger.summary = 'Get Single Topping'
        */

        const result = await Topping.findById(req.params.id);

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ['Toppings']
            #swagger.summary = 'Update Topping'
        */

        const result = await Topping.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!result) throw new CustomError('Data is not found.', 404);

        res.status(200).send({
            error: false,
            result
        })
    },

    dlt: async (req, res) => {
        /* 
            #swagger.tags = ['Toppings']
            #swagger.summary = 'Delete Topping'
        */

        const result = await Topping.deleteOne({ _id: req.params.id });

        if (!result.deletedCount) throw new CustomError('Data is not found or already deleted.', 404);

        res.sendStatus(204);
    },
}