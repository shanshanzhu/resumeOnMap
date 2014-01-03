var scraper = require('scraper');
var eventName = "urlDownload";

exports.scrapeUrl = function(url, controller) {
  console.log(url);
  scraper(url, function(err, $) {
    console.log('downloading url from ', url);
    if (err) {throw err;}
    var education = $('.summary-education.subsection-reorder');
    if (education.length >= 0) {
      exports.scrapePub($,controller);
    } else {
      controller.emit(eventName, {error:'invalidUrl'});
    }
  });
};

exports.scrapePub = function($, education,controller) {
  var data =  {'feature': 'Education',
          'content': {
              "":{"longitude":116.32, 'latitude':40,
              "summary-fn-org": 'Bachelor of Science',
              "details-education":"",
            },
              "":{"longitude":-123.24, 'latitude':49.27, "text": 'Master of Science'}
            }
          };
 
  //process education;
  var eduLists = $('#profile-experience').children[1].children[0].children;

  // var eduLists = $('.summary-education.subsection-reorder').children[1].children[0].children;
  var exception = function(tag, node){
    //check for cases where doesn't need to jump to the next children
    //case 1: children.length === 0;
    //case 2: the tagName of all the node.children === tag 
    //examples of tag: "BR" or "EM" 
    var res = true;
    var children = node.children;
    if (children.length > 0) {
      Array.prototype.forEach.call(children, function(child){
        if (child.children.length > 0 || child.tagName !== tag) {res = false;}
      });
    }
    return res;
  }
  var generateKey = function(list) {
    //use three attributes to make sure the key is not duplicated
    if(list.getAttribute('class')){
      var key = list.getAttribute('class').trim().replace(/ /g,'-');
    }
    if(list.getAttribute('id')){
      key = key.concat('-').concat(list.getAttribute('id').trim().replace(/ /g,'-'));
    }
    if(list.getAttribute('name')){
      key = key.concat('-').concat(list.getAttribute('name').trim().replace(/ /g,'-'));
    }
    if(storage[key]) {
      key = key + exports.UUID();
    }
  };

  var traverse = function(lists, storage){
    //traverse the dom for education list
    Array.prototype.forEach.call(lists, function(list, i){
      if (typeof i !== "number") { return; };
      var key = generateKey(list);
      if (!key && list.children.length > 0) {
        traverse(list.children, storage);
        return;
      }
      if (exception('BR',list) || exception('EM',list)) {
        storage[key] = list.textContent.trim();
      } else {
        storage[key] = {};
        traverse(list.children, storage[key]);
      }
    });
  };
  var item = {};
  traverse(eduLists, item);

  var workList = $('#profile-experience').children[1].children[0].children;
  controller.emit(eventName, data);

};

exports.UUID = function() {
  var s = new Array(36);
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};
//$('.background-education')


