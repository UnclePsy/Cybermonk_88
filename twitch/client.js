const tmi = require("tmi.js");
const channels = require("../json/channels.json");
require("dotenv").config();
//Get channel list
console.log(channels.channels);
// Define configuration options
const oauth = process.env.TWITCH_OAUTH;
const username = "cybermonk_88";
const opts = {
    identity: {
        username: username,
        password: oauth,
    },
    channels: channels.channels,
};
// Create a client with our options
const client = new tmi.client(opts);
module.exports = client;
