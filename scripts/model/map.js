define(["backbone","jquery","handlebar","underscore"], function(){

  var Map = Backbone.Model.extend({
    defaults: {
      "mapOptions": {
        zoom: 3,
        center: new google.maps.LatLng(42, -176)//to do set it from user IP address;
      }
    },

    initialize: function() {
      // console.log(this.get('mapOptions'));

      
    }

  });

  return Map;
});