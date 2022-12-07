const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const Car = require('../models/Car');
const User = require('../models/User');

router.get('/', (req, res, next) => {
    Location.find().populate('cars')
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.json(err);
    })
})


router.post('/create', (req, res, next) => {
    let {zip, state, city} = req.body;

    Location.create({zip, state, city})
    .then((newLocation) => {
        res.json(newLocation);
    })
    .catch((err) => {
        res.json(err);
    })
});


router.post('/:locationId/addCars', (req, res, next) => {
    let ids = req.body.carID;

    Location.findByIdAndUpdate(req.params.locationID, 
        {cars: ids})
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        })
})

router.get('/:locationID', (req, res, next) => {
    Location.findById(req.params.locationID).populate("cars")
    .then((theLocation) => {
        res.json(theLocation)
    })
    .catch((err) => {
        res.json(err);
    })
})


router.post("/remove", (req, res, next) => {
    Location.findByIdAndRemove(req.body.id)
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.json(err);
    })
});


router.post("/edit/:id", (req, res, next) => {
    const {city, state, zip} = req.body;
    Location.findByIdAndUpdate(req.params.id, {
        city, zip, state
    })
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.json(err);
    })
});

module.exports = router; 