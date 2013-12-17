define(["backbone","jquery","handlebar"], function(){

  var MapView = Backbone.View.extend({

    template: Handlebars.compile("<div class = 'map-canvas'></div>"),
    // <div class={{}}></div>


    initialize: function(){
      this.model.get('location')
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