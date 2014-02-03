module.exports = function(app, Models, schema){
  var indexCtrl = require('./controllers/index.js'),
      db = require('./controllers/dbUtility.js');
  // Initializes the models

// // Initialize database models
// var ORM = require("./server/models/initModel.js")(app),
    // Models = ORM.Models,
    // schema = ORM.schema;
    // //to do :create schema and model here.


  // indexCtrl.init(Models, schema);
//redis

  // Defines the indexCtrl routes
  app.get('/', indexCtrl.init);
  app.post('/submiturl', indexCtrl.submitUrl);
  app.post('/auth',indexCtrl.grantOauth);
  app.post('/share', indexCtrl.share);

};