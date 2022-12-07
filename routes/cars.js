const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const User = require("../models/User");
const Location = require("../models/Location");
const uploadMiddleware = require("../config/index");

router.get("/", (req, res, next) => {
    Car.find()
    .then((car) => {
        res.json(car);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.post("/create", (req, res, next) => {
    const carToCreate = {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        horsepower: req.body.horsepower,
        runs: !!req.body.runs,
    };

    Car.create(carToCreate)
    .then((newlyCreatedCar) => {
        res.json(newlyCreatedCar);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.get("/:carId", (req, res, next) => {
    Car.findById(req.params.carId)
    .then((carFromDb) => {
        res.json(carFromDb);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.post("/update/:id", (req, res, next) => {
    Car.findByIdAndUpdate(req.params.id, {
        make: req.body.make,
        model: req.body.model,
        color: req.body.color,
        horsepower: req.body.horsepower,
        runs: !!req.body.runs,
    })
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        res.json(err);
    });
});

module.exports = router;