const tmi = require("tmi.js");
const axios = require("axios");
var client = require("./client");
const fs = require("fs");

//Channels list
//Message Handler
const onMessageHandler = (target,context,msg,self) =>{
    if(self) return; // ignore messages from the bot
    const bcaster = target.slice(1); //#bcaster
    const {username,mod,subscriber} = context;
    //Sanitize
    let message = msg.trim().toLowerCase().split(' ');
    // if command
    if (!message[1])return;
    if(!(message[0].toLowerCase()==="hey" && message[1].toLowerCase=="cy"))return;

}


//TODO


const shoutout = (target, context,msg,self) => {
   // if(!(mod||bcaster)) {client.say(target, `I'm sorry ${username},I'm afraid I can't let you do that.`);return; }
   // if (!commandSpace[1]) { client.say(target, `You need someone to Shoutout`); return; }
        let streamer = commandSpace[commandSpace.indexOf('shoutout')+1];
        console.log(`https://api.twitch.tv/helix/${streamer}`);
        axios.get(`https://api.twitch.tv/helix/search/channels?query=${streamer}`, {
            headers: {
                'client-id': process.env.TWITCH_CLIENT_ID,
                'Authorization': 'Bearer '+ process.env.TWITCH_OAUTH2,
            }
    })
        .then(function (response) {
            const info = response.data.data.filter(bcaster => bcaster.display_name.toLowerCase() === streamer.toLowerCase());
            console.dir(info[0]);
            client.say(target, `Go check out ${streamer.toUpperCase()} at https://www.twitch.tv/${streamer}, a top notch streamer.  They were playing ${info[0].game_name}`);
        })
        .catch(function (error) {
           console.log(error);
        });


}
const dice = (target,context,msg, self) => {
    let sides = 6;
    const num = Math.floor(Math.random()*sides)+1
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
    return;
}
const commandRouter = {
    "dice" : dice,
    "shoutout" : shoutout

}

console.log(commandRouter['shoutout']("#uncle_psy","","",""));