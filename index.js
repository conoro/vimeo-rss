// vimeo-rss - Copyright Conor O'Neill 2020, conor@conoroneill.com
// LICENSE Apache-2.0
// Invoke like https://url.of.serverless.function/dev/rss?user=camp4collective


module.exports.check = (event, context, callback) => {

    async function getVimeoVideos() {
        var config = require('./config');
        const axios = require('axios');
        var RSS = require("rss");
        var user = event.query.user;

        try {
            const response = await axios.get("https://api.vimeo.com/users/" + user + "/videos", { headers: { "Authorization": `bearer ${config.vimeoToken}` } });
            var feed = new RSS({
                title: response.data.data[0].user.name + " on Vimeo RSS",
                description: response.data.data[0].user.short_bio,
                feed_url: "http://example.com/rss.xml",
                site_url: "https://vimeo.com/" + user,
                image_url: "https://raw.githubusercontent.com/conoro/vimeo-rss/master/vimeo-square.png",
                docs: "http://example.com/rss/docs.html",
                managingEditor: "conor@conoroneill.com",
                webMaster: "conor@conoroneill.com",
                copyright: "2020 Conor ONeill",
                language: "en",
                pubDate: "Oct 20, 2020 05:00:00 GMT",
                ttl: "60"
            });

            for (i = 0; i < response.data.data.length; i++) {
                var images = response.data.data[i].pictures.sizes;
                var img = images[images.length-4].link;
                if (typeof img === 'undefined' || img === null) img = "https://raw.githubusercontent.com/conoro/vimeo-rss/master/vimeo-square.png";
                  var summary = response.data.data[i].description;
                  if (typeof summary === 'undefined' || summary === null) summary = "No Summary Found";
                  var description = '<img src="' + img + '" alt="' + response.data.data[i].name + '" /> ' + summary;
        
                feed.item({
                    title: response.data.data[i].name,
                    description: description,
                    url: response.data.data[i].link,
                    author: response.data.data[i].user.name,
                    date: response.data.data[i].created_time
                });
            }

            var xml = feed.xml();
            context.succeed(xml);

        } catch (error) {
            // handle error
            console.log("Error 1: ", error);
        }

    }

    getVimeoVideos();

};

