define(["./maplabelView", "backbone","jquery","handlebar","underscore"], function(MapLabel){

  var textTagView = Backbone.View.extend({

    // template: Handlebars.compile("<div class = 'map-canvas'></div>"),
    initialize: function(options){
      _.extend(this, options);
      var info = this.model.attributes[1];
      this.renderLocation(info);
      this.detail = this.getDetail(info);
      this.model.on('renderNext', this.renderNext, this);
    },

    getDetail: function(info) {
      //todo: move getDetail,getRes etc. into textTag model file, if need to edit tag position/text
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

    renderLocation: function(info) {
      var organization = info['summary-fn-org'];//'Peking University'      
      if (organization.length === 0) {
        console.log('No organization in this object');
        this.renderNext();
      } else {
        var service = new google.maps.places.PlacesService(this.map);
        var request = {
          query: organization
        };
        service.textSearch(request, this.getLocation.bind(this));
      }
    },

    renderNext: function() {
      //call the category model .addTag method
      //the next Tag is rendered if there is one. 
      this.category.addTag();
      //may consider destorying the current tag;
    },

    getLocation: function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var place = results[0];
        //assume the best rating to be the first one;
        this.createMarker(place);
      } else {
        console.log('did not get search result from server');
        this.renderNext();
      }
    },

    createMarker: function(place) {
      var loc = place.geometry.location;
      if (loc) {
        this.marker = new google.maps.Marker({
          position: loc,
          map: this.map,
          draggable: false,//set to true so that marker is draggable 
          animation: google.maps.Animation.DROP
        });

        if (this.detail) {
          var mapLabel = new MapLabel({
              text: this.detail,
              position: loc,
              map: this.map,
              fontSize: 14,
              align: 'left',
              model: this.model

          });
        }
      }
    },

    destroyView: function() {

    //COMPLETELY UNBIND THE VIEW
      this.undelegateEvents();

      this.$el.removeData().unbind(); 

      //Remove view from DOM
      this.remove();  
      Backbone.View.prototype.remove.call(this);

    }

  });

  return textTagView;
});