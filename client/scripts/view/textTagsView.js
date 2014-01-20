define(["./textTagView", "backbone","jquery","handlebar"], function(TextTagView){

  var textTagsView = Backbone.View.extend({

    initialize: function(options) {
      _.extend(this, options);
      this.collection.on('renderNext', this.render, this);//could be updated in future.
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
      //another way to do it is to set('category', this.model) in textTag.js)
    }

  });

  return textTagsView;
});