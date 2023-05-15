const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brewery: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    } 
}, {
    timestamps: true
})

module.exports = beerSchema