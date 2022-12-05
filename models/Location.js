const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const locationSchema = new Schema({

    zip: Number,
    city: String,
    state: String,
    car: {type : [
        {
                type: Schema.Types.ObjectId,
                ref: 'Car'
            }
        ]
    }
}, {
    timestamps: true
})

const Location = model('Location', locationSchema);
module.exports = Location;