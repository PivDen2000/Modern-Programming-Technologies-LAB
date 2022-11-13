var pubnub = new PubNub({
    publishKey: "pub-c-51abb275-6762-4347-88c1-c08d9576245d",
    subscribeKey: "sub-c-432cf4b1-cc85-4fd3-916f-3ed99fb9bf67",
    uuid: "sec-c-ZTk4YjJhZGYtMWZiZC00Yzc3LWJmODUtN2RjODFkZTcwNDNi"
});

function validator(message) {
    return parseInt(message["numberA"]) >= 380000000000 && parseInt(message["numberA"]) < 381000000000 && parseInt(message["numberB"]) >= 380000000000 && parseInt(message["numberb"]) < 381000000000
}

pubnub.addListener({
    message: function (m) {
        if (validator(m)) {
            /*
            if (m[numberA] not in numbersDatabase)
                add m[numberA] in numbersDatabase
            if (m[numberB] not in numbersDatabase)
                add m[numberB] in numbersDatabase
            if (there are no conection m[numberA] -> m[numberB]) {
                add conection m[numberA] -> m[numberB] //with all info about this call for probably future investigation
                m[numberA].susCounter += 1
            if (m[numberA].susCounter >= 10)
                add m[numberA] in susDatabase
            }
             */
            console.log(m["message"])
        }
    }
});

pubnub.subscribe({
    channels: ["callnetwork"],
});