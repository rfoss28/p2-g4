var db = require("../models");
var passport = require('passport')

module.exports = function (app) {

  //post to sign up for a new account. 
  app.post("/signup", function (req, res) {
    // Creating user in database
    console.log('signup', req.body)

    passport.authenticate('local', function (err) {
      if (err) {
        return res.status(400).send(err.message)
      }

      // res.status(200).send('Login Success')
    })
    res.redirect("/index")
  });

  // app.post("/login", passport.authenticate('local'), function (req, res) {
  //     res.status(200).redirect("/index");

  //   //res.redirect("/index");
  //   console.log('here @ /login')
  //   console.log('signin', req.body)
  // });
  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.redirect("/index");
  });
  // app.post("/login", 
  //   passport.authenticate("local", function( req, res){
  //    // res.status(200).send('success', req.body);
  //   },{ successRedirect: "/index", failureRedirect: "*", failureFlash: true }));

  
  app.get("/logout", function (req, res) {
    console.log('logging out user');
    req.logout()
    res.redirect("/");
  })

};
