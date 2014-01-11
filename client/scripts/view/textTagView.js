define(["../../libs/maplabel", "backbone","jquery","handlebar","underscore"], function(MapLabel){

  var textTagView = Backbone.View.extend({

    // template: Handlebars.compile("<div class = 'map-canvas'></div>"),
    initialize: function(options){
      _.extend(this, options);
      var info = this.model.attributes[1];
      this.renderLocation(info);
      this.detail = this.getDetail(info);
    },

    getDetail: function(info) {
      //todo move it into textTag model file
      var results = [];
      var periods = info.period;
      var edu = info['details-education'];
      var desDetail = info['desc-details-education'];
      results.push(this.getRes(edu,'degree','major',', '));
      results.push(this.getRes(periods,'dtstart','dtend',' - '));
      if (desDetail && typeof desDetail === 'string') {
        results.push(desDetail);
      }
      return _.flatten(results).join('\n');
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

    createMarker: function() {
      debugger;
      var lgt = this.model.get('longitude');
      var text = this.model.get('text');
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lgt),
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP
      });

      var mapLabel = new MapLabel({
          text: text,
          position: new google.maps.LatLng(lat, lgt),
          map: this.map,
          fontSize: 14,
          align: 'left'
      });
      // this.render();

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