define(["./textTag", "backbone", "jquery", "handlebar"], function(TextTag){
  //note, using shim in main.js can avoid inputting arguments here. 
  //but should remember to put the rest dependency at the begining.
  //if put ./map at the end of array, function(Map), Map will still refer to the first arguments.

//app also handles controller function.

  var App = Backbone.Collection.extend({
    
    initialize: function(){
      this.mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(42, -176)//to do set it from user IP address;
      };
    },
  
    showTextTag: function(content){
      this.set('textTags', new TextTag({
        content: content,
        map: this.get('map')
      }))
    }


  });

  return App;
});