var db = require("../models");
var passport = require('passport')

module.exports = function(app) {
  

  app.post("/signup", function (req, res) {
    // Creating user in database
    console.log('signup', req.body)

    passport.authenticate('local', function(err) {
      if (err) {
        return res.status(400).send(err.message)
      }

      res.status(200).send('Login Success')
    })
    res.redirect("/index")
  });

  app.post("/login", passport.authenticate('local'), function(req, res) {
    console.log('signin', req.body)

    // res.json({
    //   status: 'User is logged in'
    // })
    res.redirect("/index");
  });


  app.get("/logout",  function(req, res) {
    req.logout()
    res.redirect("/");
  })

};
