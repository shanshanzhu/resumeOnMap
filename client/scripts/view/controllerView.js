define(["./textTagsView", "../model/textTags",
 "backbone","jquery","handlebar"], function(TextTagsView, TextTags){

  var Controller = Backbone.View.extend({

    template: Handlebars.compile("<button class='{{feature}}'>{{feature}}</button>"),

    events: {
      'click button': "renderTextTag"
    },

    renderTextTag: function(e) {
      this.model.collection.trigger('showTextTags', this.model);
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      //to fix. position
      return this;
    }

  });

  return Controller;
});