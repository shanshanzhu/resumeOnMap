var EventEmitter = require('events').EventEmitter;


exports.init = function (req, res) {
  res.render('index');
};

exports.submitUrl = function (req, res) {
  var urlScrapper = require('./urlScrapper.js').scrapeUrl;
  console.log(urlScrapper,'scraper');
  var controller = new EventEmitter();

  urlScrapper(req.body.urlinput, controller);
  controller.on('urlDownload', function(data) {
    res.send("res", data);
  })
};
exports.share = function () {

};