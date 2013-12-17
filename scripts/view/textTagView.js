define(["backbone","jquery","handlebar"], function(){

  var textTagView = Backbone.View.extend({

    // template: Handlebars.compile("<div class = 'map-canvas'></div>"),

    initialize: function(options){
      debugger;
      this.map = options.map;
      var lat = this.model.get('latitude');
      var lgt = this.model.get('longitude');
        new google.maps.Marker({
    position: new google.maps.LatLng(52.517683, 13.394393),
    map: options.map,
    draggable: false,
    animation: google.maps.Animation.DROP
  });
      // new google.maps.Marker({
      //     position: new google.maps.LatLng(52.511467, 13.447179),
      //     map: this.map,
      //     draggable: false,
      //     animation: google.maps.Animation.DROP
      //   });

      this.render();
    },

    events: {

    },

    render: function () {
      return this;
    }

  });

  return textTagView;
});