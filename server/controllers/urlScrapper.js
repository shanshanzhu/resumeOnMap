var scraper = require('scraper');
var eventName = "urlDownload";

exports.scrapeUrl = function(url, controller) {
  scraper(url, function(err, $) {
    console.log('downloading url from ', url);
    if (err) {throw err;}
    var education = 'profile-education';
    var experience = 'profile-experience';
    var data = [];
    exports.process($, education, data);
    exports.process($, experience, data);

    if (data.length > 1) {
      //handle the keyword === 'all' ;
      exports.processAll(data);
    } 
    if (data.length > 0) {
      controller.emit(eventName, data);
    } else {
      controller.emit(eventName, {'error':'cannot select education or experience from url provided'});
    }
  });
};

exports.processAll = function(data) {
  var res = {
    'feature': 'all',
    'content': []
  };
  data.forEach(function(li){
    li.content.forEach(function(subList){
      res.content.push(subList);
    });
  });
  res.content.sort(function(a,b){
    return a[0] - b[0];
  });
  data.push(res);
};

exports.process = function($, keyword, data) {
  var selector = '#' + keyword;
  if ($(selector).length > 0) {
    var JSON = exports.getJsonFromUrl($,selector);
    var Seq = exports.sequence(JSON, keyword.split('-')[1]);//only use the second half as keyword.
    data.push(Seq);
  }
};

exports.sequence = function(json,keyword){
  //put the json object in an array, sorted by the start time.
  var res = {
    'feature': keyword,
    'content': []
  };
  for (var key in json) {
    var startTime = json[key]['period']['dtstart'];
    var startTimeArr = startTime.split(' ');
    if (startTimeArr.length === 1) {
      //assume the startTime is "2004";
      res.content.push([+startTime, json[key]]);
    } else if (startTimeArr.length === 2) {
      //assume the startTime is "September 2004";
      var dateDigit = +startTimeArr[1] + (new Date(startTimeArr[0] + '01-10').getMonth() + 1)/100;
      //examples of dateDigit is 2013.01 till 2013.12;
      console.log(keyword,'keyword',startTime, dateDigit);
      res.content.push([dateDigit, json[key]]);

    }
    //to do : handle other exception cases
  }
  res.content.sort(function(a,b){
    return a[0] - b[0];
  })
  return res;
};
 
exports.getJsonFromUrl = function($, selector,controller) {
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
      var key = generateKey(storage, list);
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

  return item;
};

exports.UUID = function(n) {
  //generate random digits for reference, default as 8;note: 0x10 = 16;
  n = n || 8;
  var s = new Array(n);
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < n; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  var uuid = s.join("");
  return uuid;
};


