define(["backbone","jquery","handlebar"], function(){

  var textmodel = Backbone.Model.extend({


    initialize: function(options) {
      _.extend(this.attributes, options);
      
    },

  });

  return textmodel;
});