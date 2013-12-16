define(["./mapView", "backbone","jquery","handlebar"], function(MapView){

  var AppView = Backbone.View.extend({

    template:"  <div class=map-canvas></div>",


    initialize: function(){
      // mapView = new MapView({model: new MapMode()});
      this.render();
    },

    events: {

    },

    render: function () {
      this.$('.map-canvas').html(new MapView({model: this.model.get('map')}).el);
      return this;
    }

  });

  return AppView;
});

      // var map;
      // var initialize = function() {
      
      //   map = new google.maps.Map(document.getElementById('map-canvas'),
      //       mapOptions);
      // }
      // var canvas = document.getElementById('map-canvas');
      // google.maps.event.addDomListener(window, 'load', initialize);
      // // google.maps.event.addDomListener(canvas, 'click', showAlert);
      // canvas.addEventListener('click', function() {
      //   debugger;
      //   console.log('a');
      //   console.log(google.maps);
      // });