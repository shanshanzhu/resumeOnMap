define(["backbone","jquery","handlebar"], function(){

  var MapView = Backbone.View.extend({

    initialize: function(){
      this.map = new google.maps.Map(this.el, this.model.get('mapOptions'));
      //this blend the dom into the this.el, rather than append.
    }

  });

  return MapView;
});