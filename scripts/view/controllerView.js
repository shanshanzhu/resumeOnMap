define(["./textTagView", "../model/textTag",
 "backbone","jquery","handlebar"], function(TexTagView, TextTag){

  var Controller = Backbone.View.extend({

    template: Handlebars.compile("{{#each collection}}<button class='{{feature}}'>{{feature}}</button>{{/each}}"),

    initialize: function(){
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
      debugger;
      new TexTagView({
        collection: new TextTags(collection[0]['content']),//model: new texTag()
        map: this.map
      });
    },

    render: function () {
      this.$el.html(this.template(this));
      return this;
    }

  });

  return Controller;
});