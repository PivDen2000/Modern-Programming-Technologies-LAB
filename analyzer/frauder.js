const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const frauderSchema = new Schema({
    number: {type: String},
    tariff: {type: String},
    block: {type: String}
}, {timestamps: true})

const Frauder = mongoose.model('Frauder', frauderSchema)

module.exports = Frauder;