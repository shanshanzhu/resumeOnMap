define(["model/app", "view/appView",
  "backbone","jquery"], function(app, appView){
    var data = [
          {'feature': 'Education',
          'content': [
              {"longitude":116.32, 'latitude':40, "text": 'Bachelor of Science'},
              {"longitude":-123.24, 'latitude':49.27, "text": 'Master of Science'}
            ]
          },
          {'feature':'Work',
          'content': [
              {"longitude":-125, 'latitude':42, "text": 'Research Data Analyst'},
              {"longitude":-220,'latitude':30, "text": 'Software Consultant'}
            ]
          },
          {'feature':'all',
          'content': [
              [1999,{"longitude":-125, 'latitude':42, "text": 'Research Data Analyst'}],
              {"longitude":-220,'latitude':30, "text": 'Software Consultant'},
                 {"longitude":116.32, 'latitude':40, "text": 'Bachelor of Science'},
              {"longitude":-123.24, 'latitude':49.27, "text": 'Master of Science'}
            ]
          }
          ];
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
      debugger;
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