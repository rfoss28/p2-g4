var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // get ALL USERs
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // get ALL MEDs
  app.get("/api/meds", function(req, res) {
    db.med.findAll({}).then(function(dbmed) {
      res.json(dbmed);
    });
  });

//   db.Outlet.findAll({include: [
//     {model:db.Product, attributes: ['id', 'name', 'nameKh']}
//     ]}).then(function(outlets){
//     return res.jsonp(outlets);
// })

  // get specific USER
  app.get("/api/users/:id", function(req, res) {
    db.user.findAll({ where: { id: req.params.id } }).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Create a new USER
  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });

   // Create a new USER with MEDs
   app.post("/api/usermeds", function(req, res) {
    console.log(req.body.user_name);
    console.log(req.body.Meds);
    db.user.create(
      req.body
      ).then(function(user) {
        console.log('I HAVE USER:', user);
        return db.med.create(req.body.Meds[1])

      }).then(function(med) {
        console.log('MED IS:', med);
        return db.user.addMed(med)

      }).then(function() {
        res.sendStatus(201);
      }).catch(function() {
        res.sendStatus(400);
      }) 
    });

/*     db.user.create(req.body,{
      include: [{
        as: "meds",
        model: db.med,
        //include: [{
        //  med_id: db.med.med_id,
        //  med_name: db.med.med_name

        //}]

      }]

    }).then(function(dbuser) {
      res.json(dbuser);
    }); */

  

//   models.Survey.create(survey,{
//     include:  [models.Question,{include: [models.Option]}]
//   }).then(function() {
// reply({success:1});
// });

  // Create a new MED
  app.post("/api/meds", function(req, res) {
    console.log(req.body);
    db.med.bulkCreate(req.body).then(function(dbmed) {
      res.json(dbmed);
    });
  });

  // Delete an example by id
  app.delete("/api/users/delete/:id", function(req, res) {
    db.user.destroy({ where: { id: req.params.id } }).then(function(dbuser) {
      res.json(dbuser);
    });
  });
};
