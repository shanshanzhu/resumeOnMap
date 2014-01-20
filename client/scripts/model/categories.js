define(["./textTags", "backbone","jquery","handlebar"], function(textTags){

  var category = Backbone.Model.extend({
    
    initialize: function() {
      this.set("textTags", new textTags([],{category:this}));
      this.datum = this.get('content');
      this.textTags = this.get('textTags');
    },
    //initialize an empty collection to allow for async add event

    addTag: function() {
      console.log('addTag in category model');
      if (this.datum.length > 0) {
        this.textTags.add([this.datum.shift()]);
        //the argument of .add takes an array!!
      }
    }
  });//should be put ahead so that category is defined.

  var categories = Backbone.Collection.extend({
    model: category
  });


  return categories;
});