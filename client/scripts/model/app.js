define(["./map", "./categories", "backbone", "jquery", "handlebar"], function(map, categories){
  //note, using shim in main.js can avoid inputting arguments here. 
  //but should remember to put the rest dependency at the begining.
  //if put ./map at the end of array, function(Map), Map will still refer to the first arguments.

//app also handles controller function.

  var App = Backbone.Model.extend({
    
    initialize: function(){
      this.set('map', new map({
        zoom: 3,
        center: new google.maps.LatLng(42, -176)//to do set it from user IP address;
      }));
      this.set('categories', new categories());
    }

  });

  return App;
});