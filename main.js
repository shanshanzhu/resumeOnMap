      var map;
      var initialize = function() {
        var mapOptions = {
          zoom: 3,
          center: new google.maps.LatLng(33.5, -177)
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      }
      var canvas = document.getElementById('map-canvas');
      google.maps.event.addDomListener(window, 'load', initialize);
      // google.maps.event.addDomListener(canvas, 'click', showAlert);
      canvas.addEventListener('click', function() {
        debugger;
        console.log('a');
        console.log(google.maps);
      });

