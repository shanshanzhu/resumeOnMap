define(["backbone","jquery","handlebar"], function(){

  Handlebars.registerHelper('toUpper', function(options) {
    return options.toUpperCase();
});

  var Controller = Backbone.View.extend({

    template: Handlebars.compile("<button class='{{feature}}'>{{toUpper feature}}</button>"),

    initialize: function() {
      this.model.on('inactivate', this.inactivate, this);
    },

    events: {
      'click button': "renderTextTag"
    },

    inactivate: function(eventName) {
      if (this.$("button").hasClass('active')) {
        this.$("button").removeClass('active');
      }
    },

    renderTextTag: function(e) {
      this.model.collection.trigger('showTextTags', this.model);
      if (!this.$("button").hasClass('active')) {
        this.$("button").addClass('active');
      }
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      //to fix. position
      return this;
    }

  });

  return Controller;
});