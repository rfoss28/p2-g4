var db = require("../models");  
 
module.exports = function (app) {
 
  // get ALL USERS
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

  
  // TUTORIAL SAMPLE // *** app.put('/api/todos/:todoId', todosController.update);

  // update USER (by NAME) -- IN PROGRESS
  app.put("/api/update_meds/:name", function(req, res) {
    db.user.findOne({ where: { user_name: req.params.name } }).then(function(dbuser) {
      if (!dbuser) {
        return res.status(404).send({
          message: 'USER Not Found',
        });        
      }

      // update MEDs list
      console.log("-----------");
      console.log("begin update func");
      console.log("-----------");
      console.log(dbuser);

      return dbuser.update({        
        user_med1: req.body.user_med1 || dbuser.user_med1,
        user_med2: req.body.user_med2 || dbuser.user_med2,
        user_med3: req.body.user_med3 || dbuser.user_med3,
        user_med4: req.body.user_med4 || dbuser.user_med4,
        user_med5: req.body.user_med5 || dbuser.user_med5

      }).then(function(dbuser) {
        res.status(200).send(dbuser);
        console.log("************");

      });     
    });
  });
  
  // Create a new USER
  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // // Delete USER by NAME -- UNUSED / IN PROGRESS
  // app.delete("/api/delete/:name", function(req, res) {
  //   db.user.destroy({ where: { user_name: req.params.name } }).then(function(dbuser) {
  //     console.log('we hit it');
  //     res.json(dbuser);
  //     console.log(dbuser)

  //   });
  // });

};
