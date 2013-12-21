define(["./textTag", "backbone","jquery","handlebar"], function(TextTag){

  var textTags = Backbone.Collection.extend({

    model: TextTag,

    initialize: function(options) {
      console.log('in textTags');
      // _.extend(this.attributes, options);
      
    },

  });

  return textTags;
});