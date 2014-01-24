define(["backbone","jquery","handlebar"], function(){

  var textTag = Backbone.Model.extend({


    initialize: function(options) {
      _.extend(this.attributes, options);
      this.set('hasView', false);
      console.log('in textTag model');
      this.feature = this.collection.category.get('feature');
      this.information = this.attributes[1];
      this.getData();
    },

    getData: function() {
      var info = this.information;
      if (info && this.feature === 'experience') {
        this.organization = this.getOrganizationforExperience(info);
        this.details = this.getDetailExperience(info);
      } else if (info && this.feature === "education") {
        var org = info['summary-fn-org'];
        if (typeof org === 'string') {
          this.organization = org;
        } else if (Array.prototype.toString.call(org) === '[object Object]') {
          this.organization = org[Object.keys(org)[0]];
        }
        this.details = this.getDetailEducation(info);
      }
    },
    getOrganizationforExperience: function(info) {
      if (info.period && info.period.location) {
        return info.period.location;
      } else if (info.postitle && info.postitle['company-profile-public'] && info.postitle['company-profile-public']['org-summary']) {
        return info.postitle['company-profile-public']['org-summary'];
      }
    },
    getDetailExperience:function(info) {
      var results = [this.organization];
      var periods = info.period;
      var desDetail = info['desc-past-position'];
      if (info.postitle && info.postitle['false'] && info.postitle['false']["title"]){
        results.push(info.postitle['false']["title"]);
      }
      results.push(this.getRes(periods,'dtstart','dtend',' - '));
      if (desDetail && typeof desDetail === 'string') {
        results.push(desDetail);
      }
      return _.flatten(results);

    },

    getDetailEducation: function(info) {
      //todo: move getDetail,getRes etc. into textTag model file, if need to edit tag position/text
      var results = [this.organization];
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
      if (!this.organization || this.organization.length === 0) {
        console.log('No organization in this object');
        this.renderNext();
      } else {
        if (this.place) {
          this.trigger('createMarker', this.place);
        } else {

          var service = new google.maps.places.PlacesService(map);
          var request = {
            query: this.organization
          };
          service.textSearch(request, this.getLocation.bind(this));
        }

      }
    },

    renderNext: function() {
      var index = this.collection.indexOf(this);

      //the next Tag is rendered if there is one. 
      if (index + 1 < this.collection.length) {
        this.collection.trigger('renderNeighbour',index + 1);
      } 
      //may consider destorying the current tag;
    },

    checkActiveState: function(i) {
      //called by texttagsView~~
        //double handle the case when collection.length === 1;
        if ( i <= 0) {
          this.collection.trigger('inactivate-prevButton');
        } else {
          this.collection.trigger('activate-prevButton');
        }

        if (i >= this.collection.length - 1) {
          this.collection.trigger('inactivate-nextButtonInner');
        } else {
          this.collection.trigger('activate-nextButtonInner');
        }

    },

    renderPrevious:function() {
      var index = this.collection.indexOf(this);
      if (index > 0) {
        this.collection.trigger('renderNeighbour',index - 1);
      } 
    },

    getLocation: function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.place = results[0];
        //assume the best rating to be the first one;
        this.trigger('createMarker', this.place);
      } else {
        console.log('did not get search result from server');
        this.renderNext();
      }
    }

  });

  return textTag;
});