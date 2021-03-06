// @ts-check

const discord = require("discord.js");
const parser = require("./parse.js");
const executor = require("./execute.js");
const { expandUrl } = require("./utils/expand.js");
const dotenv = require("dotenv").config();
const express = require("express");
const { join } = require("path");
const client = new discord.Client();

function extractTextLinks(message) {
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
  return message.match(regex);
}

/**
 * Environment variables loaded from
 * the .env file using the dotenv module.
 * All these variables are added to the
 * process environment variable
 */
const token = process.env.TOKEN;
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(join(__dirname, "views")));

app.get("/", (request, response) => {
  response.sendFile("index.html");
});

app.get('/join',(request,response) => {
  response.sendFile(join(__dirname,"views","join.html"))
})

// Get the number of servers the bot is working in
const getClientGuildCount = () => {
  return client.guilds.cache.size;
};

app.get("/count", (request, response) => {
  response.json({
    count: getClientGuildCount(),
  });
});

const yakhiMessage = (message) => {
  message.channel.send(":slight_smile:").then((messageData) => {
    setTimeout(() => {
      messageData.edit(":wink:").then((editMessage) => {
        setTimeout(() => {
          editMessage.edit(":slight_smile:");
        }, 200);
      });
    }, 500);
  });
};

/**
 * @constant
 *
 * Checks if the message if a bot command
 *
 * @param {discord.Message} message
 * @returns {boolean} Whether or not the message content
 * is a valid bot command
 */
const isBotCommand = (message) => {
  return message.content.startsWith("yakhi ");
};

client.on("ready", async () => {
  console.log("The bot has started");
  const botGuildCount = client.guilds.cache.size;
  await client.user.setPresence({
    activity: {
      name: `Watching ${botGuildCount} servers`,
      type: "PLAYING",
    },
  });
  await client.user.setStatus("idle");
  console.log(client);
});

client.on("message", async (message) => {
  if (message.author.bot || message.channel.type === "dm") return;
  if (
    message.content.toLowerCase() == "client" ||
    message.content == "client, who are you?"
  ) {
    message.channel.send(
      "I am Yakhi, a bot powered by AI and created by code roller. Try `y! help all` for help."
    );
  }

  if (isBotCommand(message)) {
    const parsed = parser.parse(message.content);
    executor.exec(
      parsed.command,
      parsed.subcommand,
      parsed.args,
      message,
      client
    );
  } else {
    const mentionedEveryone = message.mentions.everyone;
    const links = extractTextLinks(message.content);
    const warnUser =
      !message.member.hasPermission("ADMINISTRATOR") && mentionedEveryone;

    if (warnUser) {
      // delete the message if the user pings
      // @everyone(All the server members).
      // This can be used to prevent spams and raids
      await message.delete().then((deletedMessage) => {
        deletedMessage.author.send(
          "Please do not ping everyone :neutral_face:"
        );
      });
    } else if (links) {
      for (let index = 0; index < links.length; index++) {
        expandUrl(links[index], true, message);
      }
    }
  }
});

client.login(token);

app.listen(port, () => {
  console.log(`Check out ${port}`);
});

module.exports = { token };
