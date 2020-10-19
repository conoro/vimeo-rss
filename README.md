# Vimeo-RSS

A Serverless Lambda function in Node.js to generate a proper RSS feed for any channel on Vimeo, now that they have decided to not support the open web any more.

Installation:

```bash
npm install -g serverless
git clone git@github.com:conoro/vimeo-rss.git
cd vimeo-rss
npm install
serverless deploy
```

Then subscribe in your RSS reader to a URL like:

```
https://your-URL-for-your-serverless-function/dev/?page=https://vimeo.com/camp4collective/videos

```

(Assumes you have your AWS config already setup)

LICENSE Apache-2.0

Copyright Conor O'Neill 2020, conor@conoroneill.com
