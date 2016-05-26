var fs = require('fs');
var async = require('async')
const moment = require('moment')

var baseURL = "https://yourwebsite.com"

var URLS = [
  {url: "", priority: 1},
  {url: "/test", priority: 0.9}]


function initializeSiteMap(callback) {

  var root = '<?xml version="1.0" encoding="UTF-8" ?>' +
    '\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

  fs.appendFile("./dist/sitemap.xml", root, function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Sitemap created");
      callback()
    }
  });
}

function createSitemap() {

  var currentTime = moment().format('YYYY-MM-DDTHH:mm:ssZ')
  for (var i = 0; i < URLS.length; i++) {

    var element = '\n<url>\n' +
      '   <loc>' + baseURL + URLS[i].url + '</loc>\n' +
      '   <lastmod>' + currentTime + '</lastmod>\n' +
      '   <changefreq>weekly</changefreq>\n' +
      '   <priority>' + URLS[i].priority + '</priority>\n' +
      '</url>'

    fs.appendFile("./dist/sitemap.xml", element, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }

}

function completeSiteMap() {

  fs.appendFile("./dist/sitemap.xml", '\n</urlset>', function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

async.series([
    function (callback) {
      initializeSiteMap(function () {
        callback(null, 'one')
      })
    },
    function (callback) {
      createSitemap()
      callback(null, 'two')
    }],
  function (err, results) {
    completeSiteMap()
  }
);



