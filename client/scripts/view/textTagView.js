define(["./maplabelView", "./nextButtonView","backbone","jquery","handlebar","underscore"], function(MapLabel, nextButtonView){

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
        this.marker = this.marker || new google.maps.Marker({
          position: loc,
          map: this.map,
          draggable: false,//set to true so that marker is draggable 
          animation: google.maps.Animation.DROP
        });
        this.setZoom();


        if (this.model.details) {
          this.mapLabel = this.mapLable || new MapLabel({
              text: this.model.details,
              position: loc,
              map: this.map,
              fontSize: 14,
              align: 'left',
              model: this.model
          });
        }
        this.renderNextBtn();
        this.model.set('hasView',true);
      }
    },

    renderNextBtn: function() {
      this.nextButtonView = new nextButtonView({
        model: this.model
      });
      //find the major container and append button;
      $('.nextButton').html(this.nextButtonView.render().el);
    },

    setZoom:function(){
      this.map.setZoom(8);
      this.map.setCenter(this.marker.getPosition());
    },

    hideView: function(){
      this.setView(null);
    },

    showView:function() {
      this.setView(this.map);
      this.setZoom();
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