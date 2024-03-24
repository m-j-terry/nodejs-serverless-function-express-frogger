const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoreSchema = new Schema({
    name: { type: String, required: true, maxlength: 15 },
    score: { type: Number, required: true }, 
    date: { type: Date, required: true }
})

const Score = mongoose.model('Score', scoreSchema)
module.exports = Score