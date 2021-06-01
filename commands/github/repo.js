const { messageEmbed } = require("./user.js");
const axios = require("axios");
const discord = require("discord.js");


const repositoryCommand = (content, message) => {
  const count = (data, find) => {
    let numberCount = 0;
    for (let index = 0; index < data.length; index++) {
      if (data[index] == find) {
        numberCount += 1;
      }
    }
    return numberCount;
  };

  const verifyRepoName = (data) => {
    return (
      data.includes("/") && count(data, "/") == 1 && data.split("/").length == 2
    );
  };
  let args = content;

  if (!verifyRepoName(args)) {
    const exception = messageEmbed("Error", "Invalid repo name");
    message.channel.send(exception);
  } else {
    const url = (data) => {
      return `https://api.github.com/repos/${data}`;
    };
    axios.default
      .get(url(args))
      .then((response) => {
        const data = response.data;
        const embed = new discord.MessageEmbed()
          .setColor("#FFFFFF")
          .setTitle(data.full_name)
          .setDescription(data.description == null ? "" : data.description)
          .setThumbnail(data.owner.avatar_url)
          .setURL(data.html_url)
          .addFields([
            {
              name: ":star: Stars",
              inline: true,
              value: data.stargazers_count,
            },
            {
              name: ":diamonds: Issues",
              inline: true,
              value: data.open_issues_count,
            },
            { name: ":fork_and_knife: Forks", inline: true, value: data.forks },
            {
              name: "Language",
              inline: true,
              value: data.language == null ? "Unknown" : data.language,
            },
          ]);

        message.channel.send(embed);
      })
      .catch((error) => {
        console.log(error);
        const err = messageEmbed(
          "Error",
          "An error occured while fetching data for you"
        );
        message.channel.send(err);
      });
  }
};

const run = (args, message, client) => {
  args.forEach((argument) => {
    repositoryCommand(argument, message);
  });
};

module.exports = { run };
