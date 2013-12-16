define(["backbone","jquery","handlebar"], function(){

  var MapView = Backbone.View.extend({

    // template: Handlebars.compile("<div class = 'map-canvas'></div>"),
    // <div class={{}}></div>


    initialize: function(){
      debugger;
      var map = new google.maps.Map(document.getElementsByClassName('container')[0], this.model.get('mapOptions'));
      //       mapOptions);
      this.render();
    },

    events: {

    },

    render: function () {
      return this;
    }

  });

  return MapView;
});