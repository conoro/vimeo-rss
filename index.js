// vimeo-rss - Copyright Conor O'Neill 2020, conor@conoroneill.com
// LICENSE Apache-2.0
// Invoke like https://url.of.serverless.function/dev/rss?page=https://vimeo.com/camp4collective

module.exports.check = (event, context, callback) => {

    const chromium = require('chrome-aws-lambda');
    let browser = null;

    const axios = require('axios');
    var cheerio = require("cheerio");

    var RSS = require("rss");
    var sectionURL = event.query.page;
    // var sectionURL = "https://vimeo.com/camp4collective/videos";


    var feed = new RSS({
        title: sectionURL.split('/').slice(-2)[0] + " on Vimeo RSS",
        description: "Vimeo videos for " + sectionURL.split('/').slice(-2)[0],
        feed_url: "http://example.com/rss.xml",
        site_url: sectionURL,
        image_url: "https://prowly-uploads.s3.eu-west-1.amazonaws.com/uploads/press_rooms/company_logos/563/indeks.png",
        docs: "http://example.com/rss/docs.html",
        managingEditor: "conor@conoroneill.com",
        webMaster: "conor@conoroneill.com",
        copyright: "2020 Conor ONeill",
        language: "en",
        pubDate: "Sep 14, 2020 08:00:00 GMT",
        ttl: "60"
    });

    doEverything();

    async function doEverything() {

        try {
            browser = await chromium.puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath,
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            });
            const page = await browser.newPage();
            await page.setViewport({ width: 1000, height: 926 });
            await page.goto(sectionURL, { waitUntil: 'networkidle2' });

            let bodyHTML = await page.evaluate(() => document.body.innerHTML);

            let $ = cheerio.load(bodyHTML);

            $(".js-browse_list li").each(function () {
                let title = $(this).find("a").attr("title").trim();
                var link = "https://www.vimeo.com" + $(this).find("a").attr("href");
                // console.log(title, "https://www.vimeo.com" + link);
                // let img = "https://prowly-uploads.s3.eu-west-1.amazonaws.com/uploads/press_rooms/company_logos/563/indeks.png";
                let description = title;
                articleDate = new Date();
                feed.item({
                    title: title,
                    description: description,
                    url: link,
                    author: "vimeo@example.com",
                    date: articleDate.toUTCString()
                });
            });

            browser.close()
            var xml = feed.xml();
            // console.log(xml);
            context.succeed(xml);
        } catch (err) {
            console.log(err)
            browser.close();
        }
    }
};
