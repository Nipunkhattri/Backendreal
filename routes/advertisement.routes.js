const express = require('express');
const router = express.Router();
const Advertisement = require('../models/advertisement.model')

//get all the advertisements
router.get('/', async (req, res) => {
    const advertisements_data = await Advertisement.find().exec()
        .then((advertisements) => {
            const response = {
                total_advertisements: advertisements.length,
                advertisements: advertisements.map((advertisement) => {
                    return advertisement
                })
            };
            res.status(200).json(response);
        }).catch((error) => {
            res.status(500).json({
                error: error
            });
        })
})

// Retrieve a advertisement on the basis of its id
router.get('/:id', async (req, res) => {
    const advertisement = await Advertisement.findOne({ _id: req.params.id })
        .then((advertisementDetails) => {
            res.status(200).json({
                advertisementDetails: advertisementDetails
            })
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            })
        })
})
// Add a advertisement
router.post('/', async (req, res) => {
    const advertisement = await Advertisement.create(req.body).then((advertisementDetails) => {
        res.status(201).json({
            message: "advertisement added successfully",
            advertisementDetails: advertisementDetails
        });
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    });
})

router.patch('/:id', async (req, res) => {
    const advertisement = await Advertisement.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((advertisementDetails) => {
            res.status(201).json({
                message: "advertisement updated successfully",
                advertisementDetails: advertisementDetails
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            })
        })
})

// Delete a advertisement
router.delete('/:id', async (req, res) => {
    Advertisement.findOneAndRemove({ _id: req.params.id })
        .then((advertisement) => {
            if (advertisement) {
                return res.status(200).json({
                    message: "advertisement removed successfully"
                })
            } else {
                return res.status(404).json({
                    message: "advertisement not found"
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