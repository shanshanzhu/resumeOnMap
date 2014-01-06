define(["backbone","jquery","handlebar"], function(){

  var textTag = Backbone.Model.extend({


    initialize: function(options) {
      _.extend(this.attributes, options);
      console.log('something is happening')
      
    }

  });

  return textTag;
});