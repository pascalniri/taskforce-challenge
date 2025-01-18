const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    budgetTitle: {
        type: String,
        required: true
    },
    budgetDescription: {
        type: String,
        required: true
    },
    budgetAmount: {
        type: Number,
        required: true
    },
    budgetDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Budget', budgetSchema)