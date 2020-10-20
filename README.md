# Vimeo-RSS

A Serverless Lambda function in Node.js to generate a proper RSS feed for any channel on Vimeo, now that they have decided to not support the open web any more.

## TODO
* More error handling

## Installation

```bash
npm install -g serverless
git clone git@github.com:conoro/vimeo-rss.git
cd vimeo-rss
npm install
```

* Go to https://developer.vimeo.com/, login and create an App for yourself only
* The Free Tier is fine
* Then create an Access Token with the option "Authenticated (You)"
* copy config-sample.js to config.js
* Paste the access token into the relevant place in config.js
* Then deploy:

```bash
serverless deploy
```

Then subscribe to each Vimeo user in your RSS reader (like Feedly) using a URL like:

```
https://your-URL-for-your-serverless-function/dev/rss?user=alhumphreys

```

(Assumes you have your AWS config already setup)

## Notes
* I used https://opml-gen.ovh/ to bulk import a big list of Vimeo user accounts in one go as an OPML file into Feedly

LICENSE Apache-2.0

Copyright Conor O'Neill 2020, conor@conoroneill.com
