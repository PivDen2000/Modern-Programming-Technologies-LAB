const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    numberA: {type: String},
    numberB: {type: String},
    tariff: {type: String},
    eventType: {type: String},
    callStart: {type: String}
}, {timestamps: true})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event;