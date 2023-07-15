const express = require('express');
const router = express.Router();
const Property = require('../models/property.model')

//get all the properties
router.get('/', async (req, res) => {
    const properties_data = await Property.find().sort({ _id: -1 }).exec()
        .then((properties) => {
            const response = {
                total_properties: properties.length,
                properties: properties.map((property) => {
                    return property
                })
            };
            res.status(200).json(response);
        }).catch((error) => {
            res.status(500).json({
                error: error
            });
        })
})

// Retrieve a property on the basis of its id
router.get('/:id', async (req, res) => {
    const property = await Property.findOne({ _id: req.params.id })
        .then((propertyDetails) => {
            res.status(200).json({
                propertyDetails: propertyDetails
            })
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            })
        })
})
// Add a property
router.post('/', async (req, res) => {
    const property = await Property.create(req.body).then((propertyDetails) => {
        res.status(201).json({
            message: "Property added successfully",
            propertyDetails: propertyDetails
        });
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    });
})

router.patch('/:id', async (req, res) => {
    const property = await Property.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((propertyDetails) => {
            res.status(201).json({
                message: "Property updated successfully",
                propertyDetails: propertyDetails
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            })
        })
})

// Delete a property
router.delete('/:id', async (req, res) => {
    Property.findOneAndRemove({ _id: req.params.id })
        .then((property) => {
            if (property) {
                return res.status(200).json({
                    message: "Property removed successfully"
                })
            } else {
                return res.status(404).json({
                    message: "Property not found"
                })
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            })
        })
})

module.exports = router