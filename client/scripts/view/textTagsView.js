define(["./textTagView", "backbone","jquery","handlebar"], function(TextTagView){

  var textTagsView = Backbone.View.extend({

    initialize: function(options) {
      _.extend(this, options);

      this.datum = this.model.get('content');
      this.textTags = this.model.get('textTags');
      this.textTags.on('add', this.renderNext, this);//could be updated in future.
    },

    render: function() {
      console.log(this.model);
      //to do : add connection lines;
      if (this.textTags.length === 0) {
        this.textTags.add([this.datum[0]]);
      }
    },

    renderNext: function(textTagModel) {
      console.log(textTagModel);
      var currentMarker = new TextTagView({
        model: textTagModel,
        map: this.map,
        dataset: this.datum
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