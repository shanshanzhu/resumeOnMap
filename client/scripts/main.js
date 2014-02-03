(function () {
  requirejs.config({
    // "baseUrl": ".", assume the url of index.html
    "paths": {
      // "app":"./app",
      "jquery"    : "//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min",
      "handlebar" : "//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.1.2/handlebars.min",
      "backbone"  : "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min",
      "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min"
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
  
  require(["router",'jquery'],function(Router) {
    $(function(){
      app = new Router();
      Backbone.history.start({pushState: true});

      function onLinkedInLoad() {
    IN.Event.on(IN, "auth", onLinkedInAuth);
  }

  function onLinkedInAuth() {
    IN.API.Profile("me").result(displayProfiles);
  }

  function displayProfiles(profiles) {
    member = profiles.values[0];
    console.log(member);
  }
  window.onLinkedInLoad = onLinkedInLoad;

    });
  });

})();
