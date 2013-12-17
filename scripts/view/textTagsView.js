define(["backbone","jquery","handlebar"], function(){

  var textTagsView = Backbone.Collection.extend({

    initialize: function() {
      this.render();
      this.collection.on('add remove change', this.render)      
    },

    render: function() {
      //to do: setTimeout parameters
      var views = this.collection.each(function(textTag){
        new textTagView({model: textTag}).el
      });


  });

  return textTagsView;
});