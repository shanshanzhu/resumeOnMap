define(["./mapView", "./controllerView", "./urlInputView", "./textTagsView",
  "backbone","jquery","handlebar"], function(mapView, controllerView, urlInputView, textTagsView){
  
  var AppView = Backbone.View.extend({

    template:"<div class=map-canvas></div> \
    <div class=url-input></div> \
    <div class=status-btn-holder></div> \
    ",

    initialize: function(){
      this.$el.html(this.template);
      this.map = this.model.get('map');
      this.categories = this.model.get('categories');
      this.mapView = new mapView({
        model: this.map,
        el: this.$('.map-canvas')
      });

      this.urlInputView = new urlInputView({
        collection: this.categories,
        el: this.$('.url-input')
      });

      this.categories.on('reset', this.renderControllerView, this);
      this.categories.on('showTextTags', this.showTextTags, this);

    },

    showTextTags: function(categoryModel){
      var marker = new textTagsView({
        model: categoryModel,
        map: this.map
      });
      marker.render();

    },

    renderControllerView: function(data){
      var self = this;
      this.categories.each(function(category){
        var btn = new controllerView({model: category});
        self.$('.status-btn-holder').append(btn.render().$el);
      });
      //for each model in collection, model.attributes is the {feature:, content:} 
      //object as in data[0] of urlInputView.checkUrl .
      //Now each button is a view, whose model is the categories Object {feature:, content:} 
    },

    render: function () {
      //todo: dim background
      this.urlInputView.render();
      return this;
    }

  });

  return AppView;
});
