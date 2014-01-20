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
      this.currentMarker = new TextTagView({
        model: textTagModel,
        category: this.model,
        map: this.map
      });
      //another way to do it is to set('category', this.model) in textTag.js)
    }

  });

  return textTagsView;
});