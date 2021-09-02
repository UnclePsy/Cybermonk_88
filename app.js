var onMessageHandler = require("./command");
var onRedeemHandler = require('./redeem');
var client = require("./client");
var express = require("express");
var app = express();
const port = 8800;
require("dotenv").config();
//Twitch//
// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
client.on('redeem', onRedeemHandler);

// Connect to Twitch:
client.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

//PubSub
app.use(express.json());
app.get('/sub/youtube', function(req, res) {
    res.send('Thank you');
    console.log("It worked");
    console.log(req.headers);
    console.log(req.body);
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})