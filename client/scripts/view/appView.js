define(["./mapView", "./controllerView", "./textTagsView", "../model/textTags",
  "backbone","jquery","handlebar"], function(MapView, ControllerView, TexTagsView, TextTags){

  var AppView = Backbone.View.extend({

    template:"<div class=map-canvas></div><div class=status-btn-holder></div>",

    initialize: function(){
      // mapView = new MapView({model: new MapMode()});
      this.$el.html(this.template);
      this.mapView = new MapView({
        model: this.model.get('mapModel'),
        el: this.$('.map-canvas')
      });

      this.controllerView = new ControllerView({
        collection: [
          {'feature': 'Education',
          'content': [
              {"longitude":116.32, 'latitude':40, "text": 'Bachelor of Science'},
              {"longitude":-123.24, 'latitude':49.27, "text": 'Master of Science'}
            ]
          },
          {'feature':'Work',
          'content': [
              {"longitude":-125, 'latitude':42, "text": 'Research Data Analyst'},
              {"longitude":-220,'latitude':30, "text": 'Software Consultant'}
            ]
          },
          {'feature':'all',
          'content': [
              {"longitude":-125, 'latitude':42, "text": 'Research Data Analyst'},
              {"longitude":-220,'latitude':30, "text": 'Software Consultant'},
                 {"longitude":116.32, 'latitude':40, "text": 'Bachelor of Science'},
              {"longitude":-123.24, 'latitude':49.27, "text": 'Master of Science'}
            ]
          }
          ],
        model: this.model,
        el: this.$('.status-btn-holder'),
        map: this.mapView.map
        // collection: this.model.get('textTags')
      });
      // this.model.on('renderTextTagsView', this.renderTextTagsView, this);

      //todo: render initial movie flow;
      // this.model.trigger('initialLoad');
      // this.model.on('initialLoad', this.controllerView.render)
      this.render();
    },

    events: {

    },

    // renderTextTagsView: function(params){
    //   new TexTagsView({
    //     collection: new TextTags(params),
    //     map: this.mapView.map
    //   });
    // },

    renderInit: function(map) {
      debugger;

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