const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const carSchema = new Schema({
    image: {
        type: String
    },
    make: {
        type: String
    },
    model: {
        type: String
    },
    color: {
        type: String
    },
    horsepower: {
        type: Number
    },
    runs: {
        type: Boolean,
        default: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location"
    }
}, {
    timestamps: true
})

const Car = model('Car', carSchema);
module.exports = Car;