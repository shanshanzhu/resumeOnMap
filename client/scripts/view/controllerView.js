define(["./textTagsView", "../model/textTags",
 "backbone","jquery","handlebar"], function(TextTagsView, TextTags){

  Handlebars.registerHelper('toUpper', function(options) {
    return options.toUpperCase();
});

  var Controller = Backbone.View.extend({

    template: Handlebars.compile("<button class='{{feature}}'>{{toUpper feature}}</button>"),

    initialize: function() {
      this.model.on('end', function(){
        this.$('button').prop('disabled',false);
      }, this);
    },

    events: {
      'click button': "renderTextTag"
    },


    renderTextTag: function(e) {
      this.model.collection.trigger('showTextTags', this.model);
      this.$('button').prop('disabled',true);
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      //to fix. position
      return this;
    }

  });

  return Controller;
});