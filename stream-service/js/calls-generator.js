var Call = class {
    constructor(outgoingNumber, incomingNumber, duration) {
        this.outgoingNumber = outgoingNumber;
        this.incomingNumber = incomingNumber;
        this.duration = duration;
    }
};

var calls = [
    new Call('1', '1', '1s'),
    new Call('1', '2', '1s'),
    new Call('1', '3', '1s'),
    new Call('1', '4', '1s'),
    new Call('1', '5', '1s'),
]

var pubnub = new PubNub({
    publishKey: "pub-c-51abb275-6762-4347-88c1-c08d9576245d",
    subscribeKey: "sub-c-432cf4b1-cc85-4fd3-916f-3ed99fb9bf67",
    uuid: "sec-c-ZTk4YjJhZGYtMWZiZC00Yzc3LWJmODUtN2RjODFkZTcwNDNi"
});

const publishMessage = async (message) => {
    await pubnub.publish({
        channel: "callnetwork",
        message: message,
    });
}

pubnub.addListener({
    message: function (m){
        addFormattedMessageCallNetwork(m.message)
    }
});

pubnub.subscribe({
    channels: ["callnetwork"],
});