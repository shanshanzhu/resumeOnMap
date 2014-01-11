define(["./textTagView", "backbone","jquery","handlebar"], function(TextTagView){

  var textTagsView = Backbone.View.extend({

    initialize: function(options) {
      _.extend(this, options);
      this.model.textTags.on('add', this.render, this);//could be updated in future.
      this.model.addTag();
    },

    render: function(textTagModel) {
      //to do : add connection lines;
      console.log(textTagModel,'textTagModel');
      var currentMarker = new TextTagView({
        model: textTagModel,
        category: this.model,
        map: this.map
      });
    }

//this.model.collection.add([])
    //   var self = this;
    //   this.collection.each(function(textTag){
    //     currentView.on
    //   });
    //   var models = this.collectionModel.models;
    //   var init = function(i, currentView) {
    //     setTimeout(function() {
    //       debugger;
    //       if (currentView) { currentView.destroyView();}
    //       if (i < models.length -1) {
    //         init(i+1, currentView);
    //       }
    //     },3000);
    //   };
    //   init(0);
    // }

  });

  return textTagsView;
});