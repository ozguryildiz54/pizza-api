"use strict"

const Pizza = require('../models/pizza');
const CustomError = require('../helpers/customError');

module.exports = {

    list: async (req, res) => {
        /* 
            #swagger.tags = ['Pizzas']
            #swagger.summary = 'List Pizzas'
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

        const result = await res.getModelList(Pizza);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Pizza),
            result
        });
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ['Pizzas']
            #swagger.summary = 'Create Pizza'
        */

        //? if same id sent more than once in the toppingIds field.


        // console.log(req.file); // single 
        // console.log(req.files); // array
        
        if (req.file) {
            req.body.image = req.file.filename;
        }

        const result = await Pizza.create(req.body);

        res.status(201).send({
            error: false,
            result
        })
    },

    read: async (req, res) => {
        /* 
            #swagger.tags = ['Pizzas']
            #swagger.summary = 'Get Single Pizza'
        */

        const result = await Pizza.findById(req.params.id);

        res.status(200).send({
            error: false,
            result
        })
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ['Pizzas']
            #swagger.summary = 'Update Pizza'
        */
        
        if (req.file) {
            req.body.image = req.file.filename
        }

        const result = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!result) throw new CustomError('Data is not found.', 404);

        res.status(200).send({
            error: false,
            result
        })
    },

    dlt: async (req, res) => {
        /* 
            #swagger.tags = ['Pizzas']
            #swagger.summary = 'Delete Pizza'
        */

        const result = await Pizza.deleteOne({ _id: req.params.id });

        if (!result.deletedCount) throw new CustomError('Data is not found or already deleted.', 404);

        res.sendStatus(204);
    },
}