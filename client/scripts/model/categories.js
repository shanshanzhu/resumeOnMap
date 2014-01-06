define(["./textTags", "backbone","jquery","handlebar"], function(textTags){

  var category = Backbone.Model.extend({
    
    initialize: function() {
        this.set("textTags", new textTags());
    }
    //initialize an empty collection to allow for async add event

  });//should be put ahead so that category is defined.

  var categories = Backbone.Collection.extend({
    model: category
  });


  return categories;
});