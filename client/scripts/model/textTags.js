define(["./textTag", "backbone","jquery","handlebar"], function(TextTag){

  var textTags = Backbone.Collection.extend({

    model: TextTag,

    initialize: function(arr,options) {
      // Backbone.Collection.apply(this,arguments);
      console.log('in textTags');
      _.extend(this, options);
    },

  });

  return textTags;
});