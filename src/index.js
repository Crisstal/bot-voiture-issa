require("dotenv").config();
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));




const { Client, Intents, Guild, ChannelManager, DiscordAPIError, Message, Channel } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


let user;
client.on("ready", async ()=> {
    client.user.setStatus("online");
    console.log("ready");
    user = await client.users.fetch('692756058367721482');
});



var count = 0;

var etat = false;
var interval;

client.on("message", async (message) => {
 if (message.content === "$car" && etat == false) { 
   etat = true;
   const url = "https://pixabay.com/api/?key=26739686-3c87402408280f39c1fa82120&q=car&image_type=photo&webformatHeight=1200";-
   fetch(url).then(res => res.json())
   .then(data=> message.channel.send(`Téma la voiture Là-bas ${user} :`  + data.hits[count].webformatURL))
   count++;

          interval = setInterval (function () {
          const url = "https://pixabay.com/api/?key=26739686-3c87402408280f39c1fa82120&q=car&image_type=photo&webformatHeight=1200";
          fetch(url).then(res => res.json())
          .then(data=> message.channel.send(`Téma la voiture Là-bas ${user} :`  + data.hits[count].webformatURL))
          count++;
          
          if(count > 19) {
            count = 0;
          }
        }, 1 * 60000 * 60 * 24); 
    } else if (message.content === "$car" && etat == true) {
      etat = false;
      message.channel.send("Desactivation du bot.")
      clearInterval(interval);

    }

})




client.login(process.env.BOT_DISCORD_TOKEN); 