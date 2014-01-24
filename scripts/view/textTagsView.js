define(["./textTagView", "./nextButtonView","backbone","jquery","handlebar"], function(TextTagView, nextButtonView){

  var textTagsView = Backbone.View.extend({

    initialize: function(options) {
      _.extend(this, options);
      this.collection.on('renderNeighbour', this.render, this);//could be updated in future.
      if (this.collection.length > 1) {
        this.renderNextBtn();
      }
    },

    renderNextBtn: function() {
      this.nextButtonView = new nextButtonView({
        collection: this.collection
      });
      //find the major container and append button;
      $('.nextButton').html(this.nextButtonView.render().el);
    },

    render: function(i) {
      //to do : add connection lines;
      i = i || 0;
      var textTagModel = this.collection.models[i];
      console.log(textTagModel,'textTagModel');
      if (textTagModel.get('hasView')) {
        textTagModel.trigger('showView');
      } else {
        this.currentMarker = new TextTagView({
          model: textTagModel,
          map: this.map
        });
      }
      this.nextButtonView.currentModel = textTagModel;
      this.nextButtonView.currentModel.checkActiveState(i);
      //another way to do it is to set('category', this.model) in textTag.js)
    }

  });

  return textTagsView;
});