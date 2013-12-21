define(["../../libs/maplabel", "backbone","jquery","handlebar"], function(MapLabel){

  var textTagView = Backbone.View.extend({

    // template: Handlebars.compile("<div class = 'map-canvas'></div>"),

    initialize: function(options){
      _.extend(this, options);
      var lat = this.model.get('latitude');
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

    // events: {

    // },

    // render: function () {
    //   return this;
    // }

  });

  return textTagView;
});