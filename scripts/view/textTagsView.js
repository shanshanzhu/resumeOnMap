define(["./textTagView", "backbone","jquery","handlebar"], function(TextTagView){

  var textTagsView = Backbone.Collection.extend({

    initialize: function(options) {
      // this.render();
      // this.set(options)
      // debugger;
      this.collectionModel = options.collection;
      this.map = options.map;
      this.collectionModel.on('add change edit', this.render);//could be updated in future.
      this.render();

    },

    render: function() {
      //to do: setTimeout parameters
      var self = this;
      var views = this.collectionModel.each(function(textTag){
        new TextTagView({
          model: textTag,
          map: self.map
        }).el
      });
    }


  });

  return textTagsView;
});