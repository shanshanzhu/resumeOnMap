var scraper = require('scraper');
var eventName = "urlDownload";

exports.scrapeUrl = function(url, controller) {
  console.log(url);
  scraper(url, function(err, $) {
    console.log('downloading url from ', url);
    if (err) {throw err;}
    var education = '.summary-education.subsection-reorder';
    var experience = '#profile-experience';

    if ($(education).length >= 0) {
      // exports.scrapePub($,experience,controller);
      exports.scrapePub($,education,controller);
    } else {
      controller.emit(eventName, {error:'invalidUrl'});
    }
  });
};

exports.scrapePub = function($, selector,controller) {
  var data =  {'feature': 'Education',
          'content': {
              "":{"longitude":116.32, 'latitude':40,
              "summary-fn-org": 'Bachelor of Science',
              "details-education":"",
            },
              "":{"longitude":-123.24, 'latitude':49.27, "text": 'Master of Science'}
            }
          };
 
  var categoryLists = $(selector)[0].children[1].children[0].children;
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
  };

  var generateKey = function(storage, list) {
    //use three attributes to make sure the key is not duplicated
    var key;
    if(list.getAttribute('class')){
      key = list.getAttribute('class').trim().replace(/ /g,'-');
    }
    if(list.getAttribute('id')){
      key = key.concat('-').concat(list.getAttribute('id').trim().replace(/ /g,'-'));
    }
    if(list.getAttribute('name')){
      key = key.concat('-').concat(list.getAttribute('name').trim().replace(/ /g,'-'));
    }
    if(storage[key]) {
      key = key + '-' + exports.UUID();
    }
    return key;
  };

  var traverse = function(lists, storage){
    //traverse the dom for education list
    Array.prototype.forEach.call(lists, function(list, i){
      console.log('*********');
      var key = generateKey(storage, list);
      console.log('key', key);
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
  traverse(categoryLists, item);

  controller.emit(eventName, item);
};

exports.UUID = function(n) {
  //generate random digits for reference, default as 8;
  n = n || 8;
  var s = new Array(n);
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < n; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  //note: 0x10 = 16;
  var uuid = s.join("");
  return uuid;
};


