define(["./textTagView", "backbone","jquery","handlebar"], function(TextTagView){

  var textTagsView = Backbone.Collection.extend({

    initialize: function(options) {
      // this.render();
      // this.set(options)
      // debugger;
      this.collectionModel = options.collection;
      this.map = options.map;
      this.collectionModel.on('add change edit', function(){
        debugger;
        this.render(); 
        });//could be updated in future.
      this.render();

    },

    render: function() {
      //to do: setTimeout parameters
      //to do : add connection lines;
      debugger;
      var self = this;
      var models = this.collectionModel.models;
      var init = function(i, currentView) {
        setTimeout(function() {
          debugger;
          if (currentView) { currentView.destroyView();}
          var currentView = new TextTagView({
              model: models[i],
              map: self.map
            }).el;
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