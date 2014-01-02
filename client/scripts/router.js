define(["model/app", "view/appView", "view/textTagsView",
  "backbone"], function(App, AppView, TexTagsView){
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
              {"longitude":-125, 'latitude':42, "text": 'Research Data Analyst'},
              {"longitude":-220,'latitude':30, "text": 'Software Consultant'},
                 {"longitude":116.32, 'latitude':40, "text": 'Bachelor of Science'},
              {"longitude":-123.24, 'latitude':49.27, "text": 'Master of Science'}
            ]
          }
          ];
  var Router = Backbone.Router.extend({
    
    routes: {
      "": "home",
      "resume/:query": "getResume"
    },

    initialize: function() {
      this.app = new App();//it is actually a collection
      this.homeView = new HomeView({
        model: this.app,
        el: $('.container')
      });
      // this.texTagsView = new TexTagsView({
      //   model: this.app,
      //   el: $('.container')
      // });

    },

    home: function() {
      this.homeView.render();
      //dim the map background;
      //render the inputboxview
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

  var HomeView = Backbone.View.extend({

    template:"<div class=map-canvas></div> \
    <div class=url-input></div>",

    initialize: function(){
      this.$el.html(this.template);

      this.mapView = new MapView({
        model: this.model,
        el: this.$('.map-canvas')
      });

      this.urlInputView = new UrlInputView({
        model: this.model,
        el: this.$('.url-input')
      });
    },

    render: function () {
      //todo: dim background
      this.urlInputView.render();
      return this;
    }

  });


  var MapView = Backbone.View.extend({

    initialize: function(){
      debugger;
      this.map = new google.maps.Map(this.el, this.model.mapOptions);
      //this blend the dom into the this.el, rather than append.
    }

  });

  var UrlInputView = Backbone.View.extend({

    template:"<form action='submit.html' method='post'> \
      <input type='url' autofocus> \
      <input type='submit' value='Go'> \
      </form>",

    render: function() {
      this.$el.html(this.template);
    }

  });

  return Router;
  

}); 