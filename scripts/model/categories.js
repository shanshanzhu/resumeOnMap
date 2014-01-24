define(["./textTags", "backbone","jquery","handlebar"], function(textTags){

  var category = Backbone.Model.extend({
    
    initialize: function() {
      this.set("textTags", new textTags([],{category:this}));
      this.datum = this.get('content');
      this.textTags = this.get('textTags');
      var i = 0;
      console.log(JSON.stringify(this.datum));
      while(this.datum.length > 0) {
        this.textTags.add([this.datum.shift()],{index:i});
        i++;
      }
    },
    //initialize an empty collection to allow for async add event

  });//should be put ahead so that category is defined.

  var categories = Backbone.Collection.extend({
    model: category
  });


  return categories;
});