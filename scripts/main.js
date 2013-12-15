(function () {
  requirejs.config({
    // "baseUrl": ".", assume the url of index.html
    "paths": {
      // "app":"./app",
      "jquery"    : "http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min",
      "handlebar" : "http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.1.2/handlebars.min",
      "backbone"  : "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min",
      "underscore": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min"
      // "gmap" : "async!http://maps.google.com/maps/api/js?sensor=false"
    },

    "shim": {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      handlebar: {
        exports: 'Handlebars'
      }
    }
  });
  
  requirejs(["app"]);


})();

      // var map;
      // var initialize = function() {
      //   var mapOptions = {
      //     zoom: 3,
      //     center: new google.maps.LatLng(33.5, -177)
      //   };
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

