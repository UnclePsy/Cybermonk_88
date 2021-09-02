// Twitch Packages
const onMessageHandler = require("./command");
const onRedeemHandler = require('./redeem');
const client = require("./client");

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
// Uncomment morgan stuff if you decide to use it: Lines: 26, 27, and 36. Also if you want info check info link
//const morgan = require("morgan");  // Yarn add morgan --dev or npm i -d morgan
// info here: https://www.npmjs.com/package/morgan

// Express App
const app = express();
const port = process.env.EXPRESS_PORT || 8008; // Add the port to the .env file called with a variable called EXPRESS_PORT

//Express Dependencies 
app.use(express.json());
//app.use(morgan('tiny')); // Uncomment if you decide to use morgan

// Express Starter page: http://localhost:8008/
app.get('/', (req, res) => {
    res.json({ message: 'Hello, World' });
});

// Express subsciption page: http://localhost:8008/sub/youtube/      
app.get('/sub/youtube', ({ query: { 'hub.challenge': challenge } }, res) => {
    console.log(challenge);
    res.status(200).end(challenge)
});

app.post(`/sub/youtube/ `, ({ body: { feed } }, res) => {
    console.log(feed);
    res.status(204).end();
});

// Starts to listen for the port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});