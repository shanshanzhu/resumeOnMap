define(["backbone","jquery","handlebar"], function(){


  var Controller = Backbone.View.extend({
    className: 'nextButton',
    template:'<div>NEXT<div>',

    events: {
      'click': "renderNext"
    },


    renderNext: function(e) {
      this.model.renderNext();
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      //to fix. position
      return this;
    }

  });

  return Controller;
});