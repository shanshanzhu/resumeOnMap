define(["model/app", "view/appView",
  "backbone","jquery"], function(app, appView){
  var Router = Backbone.Router.extend({
    
    routes: {
      "": "home",
      "submiturl": "renderTextTag",
      "resume/:query": "getResume"
    },
//you still need a hash sign to trigger the router, but it is not shown.

    initialize: function() {
      this.app = new app();//it is actually a collection
      this.homeView = new appView({
        model: this.app,
        el: $('.container')
      });
    },

    home: function() {
      this.homeView.render();
    },

    renderTextTag: function(data) {
      console.log('ah')
      console.log(data);

    },

    getResume: function(query) {
      console.log(query);
      //check if fetch gets into the models
      this.app.fetch({
        data: {
          id: query
        }
        // },
        // success: function(data) {
        //   this.resumeView.render(data);
        // }
      });

    },

  });

  return Router;

}); 