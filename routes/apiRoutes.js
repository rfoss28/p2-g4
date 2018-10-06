var db = require("../models");

<<<<<<< HEAD
module.exports = function(app) {
  
  // get ALL USERs
=======
module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // get ALL USERS
>>>>>>> master
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // get specific USER (by ID)
  app.get("/api/users/:id", function(req, res) {
    db.user.findAll({ where: { id: req.params.id } }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

<<<<<<< HEAD
  // get specific USER (by NAME)
  app.get("/api/names/:name", function(req, res) {
    db.user.findOne({ where: { user_name: req.params.name } }).then(function(dbuser) {
      res.json(dbuser);
=======
  // Create a new example
  app.post("/api/login", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      //res.json(dbExample);
      res.redirect("/index");
>>>>>>> master
    });
  });

  // Create a new USER
  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Delete an example by id
<<<<<<< HEAD
  app.delete("/api/delete/:name", function(req, res) {
    db.user.destroy({ where: { user_name: req.params.name } }).then(function(dbuser) {
=======

    });
  });



  app.post("/api/users", function (req, res) {
    db.user.create(req.body).then(function (dbuser) {
      console.log('we hit it');
>>>>>>> master
      res.json(dbuser);
      console.log(dbuser)
    });
  });


};
