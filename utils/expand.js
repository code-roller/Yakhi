const { parse } = require('url')
const http = require('http')
const https = require('https')
const axios = require('axios')
const { messageEmbed } = require('../commands/github/user')
const { Message } = require('discord.js')

function expandUrlException(message, url) {
    message.channel.send(messageEmbed(
        "Error with url",
        `${url} not a valid url`
    ))
}

function expandUrl(url , discord, message) {
  // validate the urls
  if (url == undefined) {
    return expandUrlException(message)
  }

  if (!(url.startsWith('https://') || url.startsWith('http://'))) {
    return expandUrlException(message)
  }
  const parsedUrl = parse(url);
  // send the request based on protocols
  // http.request for http:// and
  // https.request for https://
  (parsedUrl.protocol == 'https:' ? https : http)
    .request(
      {
        method: 'HEAD',
        host: parsedUrl.host,
        path: parsedUrl.pathname,
      },
      (response) => {
        const expandedUrl = response.headers.location || url;
        console.log(expandedUrl, discord)
        return expandedUrl
      }
    )
    .end();
};

module.exports = { expandUrl }