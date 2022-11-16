const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blockedEventSchema = new Schema({
    numberA: {type: String},
    numberB: {type: String},
    tariff: {type: String},
    eventType: {type: String},
    callStart: {type: String}
}, {timestamps: true})

const BlockedEvent = mongoose.model('BlockedEvent', blockedEventSchema)

module.exports = BlockedEvent;