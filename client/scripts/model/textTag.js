define(["backbone","jquery","handlebar"], function(){

  var textTag = Backbone.Model.extend({


    initialize: function(options) {
      _.extend(this.attributes, options);
      console.log('something is happening');
      debugger;
    },

    getDetail: function() {
      //todo: move getDetail,getRes etc. into textTag model file, if need to edit tag position/text
      var info = this.attributes[1];
      var results = [];
      var periods = info.period;
      var edu = info['details-education'];
      var desDetail = info['desc-details-education'];
      results.push(this.getRes(edu,'degree','major',', '));
      results.push(this.getRes(periods,'dtstart','dtend',' - '));
      if (desDetail && typeof desDetail === 'string') {
        results.push(desDetail);
      }
      return _.flatten(results);
    },

    getRes: function(cat,st,en,jointLetter) {
      var results = [];
      if(cat) {
        var start = cat[st];
        var end = cat[en];
        if (start && end) {
          results.push(start + jointLetter + end);
        } else if (start) {
          results.push(start);
        } else if (end) {
          results.push(end);
        }
      }
      return results;
    },

    renderLocation: function(map) {
      var info = this.attributes[1];
      var organization = info['summary-fn-org'];//'Peking University'      
      if (organization.length === 0) {
        console.log('No organization in this object');
        this.renderNext();
      } else {
        var service = new google.maps.places.PlacesService(map);
        var request = {
          query: organization
        };
        service.textSearch(request, this.getLocation.bind(this));
      }
    },

    renderNext: function() {
      //call the category model .addTag method
      //the next Tag is rendered if there is one. 
      debugger;
      this.collection.category.addTag();
      //may consider destorying the current tag;
    },

    getLocation: function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var place = results[0];
        //assume the best rating to be the first one;
        this.trigger('createMarker', place);
      } else {
        console.log('did not get search result from server');
        this.renderNext();
      }
    }

  });

  return textTag;
});