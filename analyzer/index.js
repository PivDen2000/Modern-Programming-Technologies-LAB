const PubNub = require('pubnub');
const mongoose = require('mongoose');
const Event = require('./event')
const BlockedEvent = require('./blockedEvent')
const Frauder = require('./frauder')

const pubnub = new PubNub({
    publishKey: "pub-c-51abb275-6762-4347-88c1-c08d9576245d",
    subscribeKey: "sub-c-432cf4b1-cc85-4fd3-916f-3ed99fb9bf67",
    uuid: "sec-c-ZTk4YjJhZGYtMWZiZC00Yzc3LWJmODUtN2RjODFkZTcwNDNi"
});

pubnub.subscribe({
    channels: ["callnetwork"],
});

const uri = "mongodb+srv://PivDen2000:789456123qwerty@cluster1.k3upv7e.mongodb.net/?retryWrites=true&w=majority";
mongoose
    .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => console.log("Connected"))
    .catch(err => console.label(err));

pubnub.addListener({
    message: function (m) {
        const message = m.message;
        const event = new Event({
            numberA: message.numberA,
            numberB: message.numberB,
            tariff: message.tariff,
            eventType: message.eventType,
            callStart: message.callStart
        })

        if (!validate(event)) {
            console.log("No valid event")
            return
        }

        if (analyze(event)) {
            event
                .save()
                .then(res => {
                    console.log('Good');
                    console.log(res);
                })
                .catch(err => console.log(err))
        } else {
            const blockedEvent = new BlockedEvent({
                numberA: message.numberA,
                numberB: message.numberB,
                tariff: message.tariff,
                eventType: message.eventType,
                callStart: message.callStart
            });
            blockedEvent
                .save()
                .then(res => {
                    console.log('Blocked');
                    console.log(res);
                })
                .catch(err => console.log(err))

            const frauder = new Frauder({
                number: (message.eventType === 'in call')
                    ? message.numberB
                    : message.numberA,
                tariff: message.tariff,
                block: 'Block Call'
            });
            frauder
                .save()
                .then(res => {
                    console.log('Frauder')
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
    }
});

const analyze = (event) => {
    return Number(event.numberA[11]) % 2;
}

const validate = (message) => {
    return parseInt(message["numberA"]) >= 380000000000 && parseInt(message["numberA"]) < 381000000000 && parseInt(message["numberB"]) >= 380000000000 && parseInt(message["numberB"]) < 381000000000
}