var db = require("../models");

module.exports = function(app) {
  
  // get ALL USERs
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

  // get specific USER (by NAME)
  app.get("/api/names/:name", function(req, res) {
    db.user.findOne({ where: { user_name: req.params.name } }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Create a new USER
  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Delete an example by id
  app.delete("/api/delete/:name", function(req, res) {
    db.user.destroy({ where: { user_name: req.params.name } }).then(function(dbuser) {
      res.json(dbuser);
    });
  });
};
