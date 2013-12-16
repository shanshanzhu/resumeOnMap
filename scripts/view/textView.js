define(["backbone","jquery","handlebar"], function(){

  var MapView = Backbone.View.extend({

    template: Handlebars.compile("<div class = 'map-canvas'></div>"),
    // <div class={{}}></div>


    initialize: function(){
      this.render();
    },

    events: {

    },

    render: function () {
      return this;
    }

  });

  return MapView;
});

// define(["backbone","jquery","handlebar"], function(){

//   var AppView = Backbone.View.extend({

//     template: Handlebars.compile("<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
//                "{{kids.length}} kids:</p>" +
//                "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>"),
//     // <div class={{}}></div>


//     initialize: function(){
//       // mapView = new MapView({model: new MapMode()});
//       this.render();
//     },

//     events: {

//     },

//     render: function () {

//       var data = { "name": "Alan", "hometown": "Somewhere, TX",
//                "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
//       var template = this.template(data);
//       this.$el.html(template);
//       return this;
//     }

//   });

//   return AppView;
// });