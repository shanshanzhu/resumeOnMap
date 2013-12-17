define(["./mapView", "./controllerView", "backbone","jquery","handlebar"], function(MapView, ControllerView){

  var AppView = Backbone.View.extend({

    template:"<div class=map-canvas></div><div class=status-btn-holder></div>",

    initialize: function(){
      // mapView = new MapView({model: new MapMode()});
      this.$el.html(this.template);
      this.mapView = new MapView({
        model: this.model.get('map'),
        el: this.$('.map-canvas')
      });

      this.controllerView = new ControllerView({
        collection: [
          {'feature':'Education',
          'content': [
              {"location":{}, "text": ''},
              {"location":{}, "text": ''}
            ]
          },
          {'feature':'Work',
          'content': [
              {"longitude":3,'latitude':4, "text": ''},
              {"longitude":3,'latitude':4, "text": ''}
            ]
          }
          ],
        el: this.$('.status-btn-holder')
        // collection: this.model.get('textTags')
      });

      this.model.trigger('initialLoad');
      this.model.on('initialLoad', this.controllerView.render)
      this.render();
    },

    events: {

    },

    renderControllerView: function() {
      debugger;
      
    },

    render: function () {
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