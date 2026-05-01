"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Order = require('../models/order');
const CustomError = require('../helpers/customError');

module.exports = {

    list: async (req, res) => {
        /* 
            #swagger.tags = ['Orders']
            #swagger.summary = 'List Orders'
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

        const result = await res.getModelList(Order);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Order),
            result
        });
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ['Orders']
            #swagger.summary = 'Create Order'
        */

        //? adding logged in user`s id to req.body as userId field

        //? find pizza price using pizzaId field


        const result = await Order.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {
        /* 
            #swagger.tags = ['Orders']
            #swagger.summary = 'Get Single Order'
        */

        const result = await Order.findById(req.params.id);

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ['Orders']
            #swagger.summary = 'Update Order'
        */

        const result = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!result) throw new CustomError('Data is not found.', 404);

        res.status(200).send({
            error: false,
            result
        })
    },

    dlt: async (req, res) => {
        /* 
            #swagger.tags = ['Orders']
            #swagger.summary = 'Delete Order'
        */

        const result = await Order.deleteOne({ _id: req.params.id });

        if (!result.deletedCount) throw new CustomError('Data is not found or already deleted.', 404);

        res.sendStatus(204);
    },
}