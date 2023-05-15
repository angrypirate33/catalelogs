const mongoose = require('mongoose')
const Schema = mongoose.Schema
const beerSchema = require('./beer')



const catalelogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    beer: [beerSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Catalelog', catalelogSchema)