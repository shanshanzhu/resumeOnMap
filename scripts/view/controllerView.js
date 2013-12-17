define(["./textTagsView", "../model/textTags",
 "backbone","jquery","handlebar"], function(TexTagsView, TextTags){

  var Controller = Backbone.View.extend({

    template: Handlebars.compile("{{#each collection}}<button class='{{feature}}'>{{feature}}</button>{{/each}}"),

    initialize: function(options){
      this.render();
    },

    events: {
      'click button': "renderTextTag"
    },

    renderTextTag: function(e) {
      var feature = e.target.getAttribute('class');
      var collection = this.collection.filter(function(item){
        return item.feature === feature;
      });
      this.model.trigger('renderTextTagsView', collection[0]['content']);
      //this is listened by appView to trigger a collection model and collection view.

    },

    render: function () {
      this.$el.html(this.template(this));
      return this;
    }

  });

  return Controller;
});