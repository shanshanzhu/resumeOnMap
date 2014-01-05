define(["backbone","jquery","handlebar"], function(){

  var UrlInputView = Backbone.View.extend({
//add filter for linkedin
    template:"<form method='post' action='/submiturl.html'> \
      <input class='urlinput' type='text' name='urlinput' placeholder='http://www.linkedin.com/' autofocus> \
      <input type='submit' value='Go'> \
      </form>",
    
    events: {
      "submit": "checkUrl"
    },
    checkUrl: function(e){
      e.preventDefault();
      var self = this; //to be used in $.post;
      var text = $('.urlinput').val();
      if (text.indexOf("http://") === -1 || text.indexOf("linkedin.com/") === -1 ) {
        alert('please enter a valid linkedin public url');
      }
      $.post('/submiturl',{urlinput: text}, function(data){
        // window.location.hash = 'submiturl';//to redirect to submiturl
        self.collection.reset(data);
        self.$el.html(); //remove the inputBox View;
        console.log(data);
      })
    },
    render: function() {
      this.$el.html(this.template);
    }
  });

  return UrlInputView;
});