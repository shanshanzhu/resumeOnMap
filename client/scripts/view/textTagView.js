define(["./maplabelView", "backbone","jquery","handlebar","underscore"], function(MapLabel){

  var textTagView = Backbone.View.extend({

    // template: Handlebars.compile("<div class = 'map-canvas'></div>"),
    initialize: function(options){
      _.extend(this, options);
      this.model.renderLocation(this.map);
      this.detail = this.model.getDetail();
      this.model.on('createMarker', this.createMarker, this);
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