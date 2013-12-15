define(["backbone","jquery","handlebar"], function(){

  var AppView = Backbone.View.extend({

    template: Handlebars.compile("<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
               "{{kids.length}} kids:</p>" +
               "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>"),
    // <div class={{}}></div>


    initialize: function(){
      // mapView = new MapView({model: new MapMode()});
      this.render();
    },

    events: {

    },

    render: function () {
      debugger;

      var data = { "name": "Alan", "hometown": "Somewhere, TX",
               "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
      var template = this.template(data);
      this.$el.html(template)
      return this;
    }

  });

  return AppView;
});

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

