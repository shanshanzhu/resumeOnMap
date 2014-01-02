var scraper = require('scraper');
var eventName = "urlDownload";

exports.scrapeUrl = function(url, controller) {

  scraper(url, function(err, $) {
    console.log('downloading url from ', url);
    if (err) {throw err;}
    if (url.indexOf('/pub/') !== -1) {
      exports.scrapePub($, controller);
    } else if (url.indexOf('/in/') !== -1) {
      exports.scrapeIn($, controller);
    } else {
      controller.emit(eventName, {error:'invalidUrl'});
    }
  });

};

exports.scrapePub = function($, controller) {
  var data = {};
  console.log('jquery',$('.background-education'));
  // .each(function() {
  //   dbUrls.push([$(this).attr('href'), $(this).text().trim().replace(/[^A-Za-z\d\_]/g, '_')]);
  // });
  controller.emit(eventName, data);

};

