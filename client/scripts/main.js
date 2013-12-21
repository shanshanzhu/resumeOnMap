(function () {
  requirejs.config({
    // "baseUrl": ".", assume the url of index.html
    "paths": {
      // "app":"./app",
      "jquery"    : "http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min",
      "handlebar" : "http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.1.2/handlebars.min",
      "backbone"  : "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min",
      "underscore": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min"
    },

    "shim": {
      underscore: {
        exports: '_'
      },
      jquery: {
        exports: '$'
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      handlebar: {
        exports: 'Handlebars'
      }
    }
  });
  
  require(["view/appView", "model/app",'jquery'],function(AppView, App) {
    $(function(){
      new AppView({
        model: new App(),
        el: $('.container')
      })
    });
  });

})();
