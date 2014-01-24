define(["backbone","jquery","handlebar"], function(){


  var Controller = Backbone.View.extend({
    template:'<button class="prevButton">Previous</button> \
    <button class="nextButtonInner">NEXT</button>',
    
    initialize: function(){
      this.registerInactivate('inactivate-prevButton');
      this.registerInactivate('inactivate-nextButtonInner');
      this.registerActivate('activate-prevButton');
      this.registerActivate('activate-nextButtonInner');
    },

    events: {
      'click .prevButton': "renderPrevious",
      'click .nextButtonInner': "renderNext"
    },

    registerActivate: function(eventName) {
      var className = '.'+eventName.split('-')[1];
      this.collection.on(eventName, function() {
        if (this.$(className).hasClass('inactive')) {
          this.$(className).removeClass('inactive');
        }
      }, this);
    },

    registerInactivate: function(eventName) {
      var className = '.'+eventName.split('-')[1];
      this.collection.on(eventName, function() {
        this.$(className).addClass('inactive');
      }, this);
    },

    renderNext: function(e) {
      this.currentModel.renderNext();
    },

    renderPrevious: function() {
      this.currentModel.renderPrevious();
    },

    render: function () {
      this.$el.html(this.template);
      return this;
    }

  });

  return Controller;
});