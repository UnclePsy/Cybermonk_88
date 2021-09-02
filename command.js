const tmi = require("tmi.js");
const axios = require("axios");
var client = require("./client");
const fs = require("fs");
require("dotenv").config();

//TODO transform this into a regex function
function contains(target, pattern) {
    var value = 0;
    pattern.forEach(function (word) {
        value = value + target.includes(word);
    });
    return (value === 1)
}
//TODO transform this into a DB dictionary
const pattyRiceIdentifiers = ["pattyrice", "patty"];


module.exports = function onMessageHandler(target, context, msg, self) {
    console.log("target: " + target);
    if (self) {
        return;
    } // Ignore messages from the bot
    // Remove whitespace from chat message
    var commandSpace = msg.trim().toLowerCase().split(' ');
    //if not a bot command => sleep
    if (!commandSpace[1]) {
        console.log("I sleep"); return;
    }
    if (!(commandSpace[0].toLowerCase() == "hey" && commandSpace[1].toLowerCase() == "cy")) {
        console.log("I sleep"); return;
    }
    //sanitize user input
    var commandName = commandSpace.splice(0, 2)
    console.log(commandSpace);
    const username = context['display-name'];
    const mod = context['mod'];
    const bcaster = (username == target.slice(1));

    // If the command is known, let's execute it
    //Dice
    if (commandSpace.includes("dice")) {
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
        return;
    }
    //Coin
    if (commandSpace.includes("coin")) {
        const side = tossCoin();
        client.say(target, `${side} !`);
        console.log(`* Executed ${commandName} command`);
        return;
    }
    if (commandSpace.includes("joke")) {
        axios.get('https://icanhazdadjoke.com/', {
            headers: {
                Accept : 'text/plain'
                
            }
        })
            .then(function (response) {
                client.say(target, response.data);
            })
            .catch(function (error) {
                if(error.response.status == 503)
                client.say(target, "Sorry the service is down");
                console.dir(error.response);
            });

        console.log(`* Executed ${commandName} command`);
        return;
    }
    //cats facts
    if (commandSpace.includes("cat") && commandSpace.includes('fact')) {
        axios.get('https://catfact.ninja/fact',)
            .then(function (response) {
                console.log(response.data);
                client.say(target, response.data.fact);
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(`* Executed ${commandName} command`);
        return;
    }
    else if(commandSpace.includes('shoutout')||commandSpace.includes('so')){
            if(!(mod||bcaster)) {client.say(target, `I'm sorry ${username},I'm afraid I can't let you do that.`);return; }
            if (!commandSpace[1]) { client.say(target, `You need someone to Shoutout`); return; }
                let streamer = commandSpace[commandSpace.indexOf('shoutout')+1];
                if(commandSpace.indexOf('shoutout')<1)streamer = commandSpace[commandSpace.indexOf('so')+1];
                console.log(`https://api.twitch.tv/helix/${streamer}`);
                axios.get(`https://api.twitch.tv/helix/search/channels?query=${streamer}`, {
                    headers: {
                        'client-id': process.env.TWITCH_CLIENT_ID,
                        'Authorization': 'Bearer '+ process.env.TWITCH_OAUTH2,
                    }
            })
                .then(function (response) {
                    //console.log(response);
                    const info = response.data.data.filter(bcaster => bcaster.display_name.toLowerCase() === streamer.toLowerCase());
                    console.dir(info[0]);
                    client.say(target, `Go check out ${streamer.toUpperCase()} at https://www.twitch.tv/${streamer}, a top notch streamer.  They were playing ${info[0].game_name}`);
                })
                .catch(function (error) {
                   //console.log(error);
                });


        }
    //Rock Paper Scissor
    else if (commandSpace.includes("rps")) {
        if (!commandSpace[1]) { client.say(target, `You have to choose : rock, paper or scissors`); return; }
        let player = commandSpace[1];
        let bot = selectRps();
        console.log(player + bot);
        if (player === bot) client.say(target, bot + `: It's a draw....Try again`);
        else if (player === 'scissors') {
            if (bot === 'rock') client.say(target, bot + `: I won!  Better luck next time`);
            if (bot === 'paper') client.say(target, bot + `: You won! Congratulations `);
            return;
        }
        else if (player === 'paper') {
            if (bot === 'scissors') client.say(target, bot + `: I won!  Better luck next time`);
            if (bot === 'rock') client.say(target, bot + `: You won! Congratulations `);
            return;
        }
        else if (player === 'rock') {
            if (bot === 'paper') client.say(target, bot + `: I won!  Better luck next time`);
            if (bot === 'scissors') client.say(target, bot + `: You won! Congratulations `);
            return;
        }
        else client.say(target, bot + `You have to choose : rock, paper or scissors`)
        console.log(`* Executed ${commandName} command`);
    }
    //Blame
    else if (commandSpace.includes("blame")) {
        if (!commandSpace[1]) client.say(target, `It's all ${username}'s fault`);
        else {
            client.say(target, `It's all ${commandSpace[1]}'s fault`);
        }
        //kryoBuck

    } else if (commandSpace.includes("thank")) {
        if (!commandSpace[1]) client.say(target, `It's all ${username}'s fault`);
        else {
            client.say(target, `Big Thank you to ${commandSpace[1]}`);
        }
        //kryoBuck

    } else if (commandSpace.includes("kryobuck")) {
        const balance = 0;
        if (!commandSpace[1]) client.say(target, `Your balance is ${balance} Kryobucks`);
    } else {
        console.log(`* Unknown command ${commandSpace}`);
        client.say(target, `I'm sorry ${username},I'm afraid I can't do that.`)
        return;
    }
}
// Function called when the "dice" command is issued
function rollDice(sides = 6) {
    return Math.floor(Math.random() * sides) + 1;
}
function tossCoin() {
    const sides = {
        0: 'heads',
        1: 'tail',
    };
    return sides[Math.floor(Math.random() * 2)];
}
function selectRps() {
    const rps = {
        0: 'rock',
        1: 'paper',
        2: 'scissors'
    }
    return rps[Math.floor(Math.random() * 3)];
}