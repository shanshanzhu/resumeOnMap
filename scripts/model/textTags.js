define(["./textTag", "backbone","jquery","handlebar"], function(TextTag){

  var textTags = Backbone.Collection.extend({

    model: TextTag,

    initialize: function(arr,options) {
      console.log('in textTags');
      _.extend(this, options);
    }

  });

  return textTags;
});