const tmi = require("tmi.js");
const axios = require("axios");
var client = require("./client");
const fs = require("fs");



module.exports = function onRedeemHandler(channel, username, rewardType, tags) {

    client.say(channel, `Thank you ${username} for the redeem! :)`);
}
