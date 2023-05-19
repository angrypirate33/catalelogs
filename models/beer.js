const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brewery: {
        type: String
    },
    style: {
        type: String
    },
    abv: {
        type: String
    }, 
    ibu: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = beerSchema