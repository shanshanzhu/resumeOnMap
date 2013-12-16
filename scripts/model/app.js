define(["./map","backbone", "jquery", "handlebar"], function(Map){
  //note, using shim in main.js can avoid inputting arguments here. 
  //but should remember to put the rest dependency at the begining.
  //if put ./map at the end of array, function(Map), Map will still refer to the first arguments.

  var App = Backbone.Model.extend({
    initialize: function(){
      this.set('map', new Map());
      //var marker = new Marker({map:});
    },

  });

  return App;
});