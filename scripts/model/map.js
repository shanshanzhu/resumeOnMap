define(["backbone","jquery","handlebar","underscore"], function(){

  var Map = Backbone.Model.extend({

    initialize: function(options) {
      this.set('mapOptions', options);
    }

  });

  return Map;
});