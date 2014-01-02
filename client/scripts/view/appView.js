define(["./mapView", "./controllerView", "./textTagsView", "../model/textTags",
  "backbone","jquery","handlebar"], function(MapView, ControllerView, TexTagsView, TextTags){

  var AppView = Backbone.View.extend({

    template:"<div class=map-canvas></div> \
    <div class=url-input></div>",
    // <div class=status-btn-holder></div> \

    initialize: function(){
      this.mapView = new MapView({
        model: this.model,
        el: this.$('.map-canvas')
      });

      this.urlInputView = new UrlInputView({
        model: this.model,
        el: this.$('.url-input')
      });

      // this.controllerView = new ControllerView({
        // collection: [],//todo: set data for controllerView;
      //   model: this.model,
      //   el: this.$('.status-btn-holder'),
      //   map: this.mapView.map
      // });
    },

    render: function () {
      this.$el.html(this.template);
      //todo: dim background
      return this;
    }

  });

  var UrlInputView = Backbone.View.extend({

    template:"<form action='submit.html' method='post'> \
      <input type='url' autofocus> \
      <input type='submit' value='Go'> \
      </form>",

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