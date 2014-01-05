define(["./mapView", "./controllerView", "./textTagsView", "./urlInputView",
  "backbone","jquery","handlebar"], function(mapView, controllerView, texTagsView, urlInputView){
  
  var AppView = Backbone.View.extend({

    template:"<div class=map-canvas></div> \
    <div class=url-input></div> \
    <div class=status-btn-holder></div> \
    ",

    initialize: function(){
      this.$el.html(this.template);
      this.mapModel = this.model.get('mapModel');
      this.textTags = this.model.get('textTags');

      this.mapView = new mapView({
        model: this.mapModel,
        el: this.$('.map-canvas')
      });

      this.urlInputView = new urlInputView({
        collection: this.textTags,
        el: this.$('.url-input')
      });

      this.controllerView = new controllerView({
        collection: this.textTags,
        el: this.$('.status-btn-holder'),
        map: this.mapView.map
      });

      this.texTagsView = new texTagsView({collection: this.textTags});
    },

    render: function () {
      //todo: dim background
      this.urlInputView.render();
      return this;
    }

  });

  return AppView;
});
