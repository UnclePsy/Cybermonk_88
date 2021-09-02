// Twitch Packages
const onMessageHandler = require("./twitch/command");
const onRedeemHandler = require('./twitch/redeem');
const client = require("./twitch/client");

// Adds env variables
require("dotenv").config();

//Twitch//
// Called every time the bot connects to Twitch chat
let onConnectedHandler = (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
}

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
client.on('redeem', onRedeemHandler);

// Connect to Twitch:
client.connect();

// Express Packages
const express = require("express");
const volleyball = require("volleyball");


// Express App
const app = express();
const port = process.env.EXPRESS_PORT || 8008; // Add the port to the .env file called with a variable called EXPRESS_PORT

//Express Dependencies 
app.use(express.json());
app.use(volleyball);

// Express Starter page: http://localhost:8008/
app.get('/', (req, res) => {
    res.json({ message: 'Hello, World' });
});

// Express subsciption page: http://localhost:8008/sub/youtube/      
app.get('/sub/youtube', (req, res) => {
    res.json({ message: 'Thank you' });
    console.log('Request Information:');
    console.log(req.headers);
    console.log(req.body);
});

// Starts to listen for the port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
