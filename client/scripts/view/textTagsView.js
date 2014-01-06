define(["./textTagView", "backbone","jquery","handlebar"], function(TextTagView){

  var textTagsView = Backbone.Collection.extend({

    initialize: function(options) {
      _.extend(this.options);
      this.collection.on('add', this.render, this);//could be updated in future.
    },

    render: function(textTag) {
      //to do: setTimeout parameters
      //to do : add connection lines;
      debugger;
      var self = this;
      this.collection.each(function(textTag){
        var currentView = new TextTagView({
            model: textTag,
            map: self.map
        });
        currentView.on
      });
      var models = this.collectionModel.models;
      var init = function(i, currentView) {
        setTimeout(function() {
          debugger;
          if (currentView) { currentView.destroyView();}
          if (i < models.length -1) {
            init(i+1, currentView);
          }
        },3000);
      };
      init(0);
    }

  });

  return textTagsView;
});