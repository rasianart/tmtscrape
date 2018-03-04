var path = require('path');
const express = require('express')
const app = express()
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/scrape.html'));
})

app.get('/data', (req, res) => {
  request('https://www.tinymixtapes.com/chocolate-grinder', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let uniLinks = [];
      let embeds = [];
      let links = $('.tile__link').toArray();
      links.forEach(function(item, index) {
        var link = item.attribs.href;
          if (uniLinks.indexOf(link) == -1) {
            var linkType  = link.substr(1).substr(0,5);
            if (linkType == 'choco') {
              uniLinks.push(link);
            }

          }
      })
      var length = uniLinks.length;
      var count = 0;
      uniLinks.forEach(function(item, index) {
        request('https://www.tinymixtapes.com' + item, function (error2, response2, html2) {
          if (!error2 && response2.statusCode == 200) {
              const $2 = cheerio.load(html2);
              var iframe = $2('iframe').eq(1).attr('src');
              // console.log(iframe);
              embeds.push(iframe);
              if (count == length -1) {
                res.send(embeds);
              }
          }
          count++;
        });
      })

    }
  });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
