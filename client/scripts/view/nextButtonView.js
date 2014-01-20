define(["backbone","jquery","handlebar"], function(){


  var Controller = Backbone.View.extend({
    template:'<button class="nextButtonInner">NEXT</button>',

    events: {
      'click': "renderNext"
    },

    renderNext: function(e) {
      this.model.renderNext();
    },

    render: function () {
      this.$el.html(this.template);
      //to fix. position
      return this;
    }

  });

  return Controller;
});