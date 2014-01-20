define(["./maplabelView", "backbone","jquery","handlebar","underscore"], function(MapLabel){

  var textTagView = Backbone.View.extend({

    // template: Handlebars.compile("<div class = 'map-canvas'></div>"),
    initialize: function(options){
      _.extend(this, options);
      this.model.renderLocation(this.map);
      this.model.on('createMarker', this.createMarker, this);
      this.model.on('hideView',this.hideView,this);
      this.model.on('showView',this.showView,this);
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

        if (this.model.details) {
          this.mapLabel = new MapLabel({
              text: this.model.details,
              position: loc,
              map: this.map,
              fontSize: 14,
              align: 'left',
              model: this.model
          });
        }
      }
    },

    hideView: function(){
      this.setView(null);
    },

    showView:function() {
      this.setView(this.map);
    },

    setView: function(val) {
      if (this.marker) {
        this.marker.setMap(val);
        if(this.mapLabel) {
          this.mapLabel.setMap(val);
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