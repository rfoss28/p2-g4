require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

let user = {
  name: 'Username',
  id: 123
}

passport.use(new LocalStrategy((username, password, done) => {
  // find user in database for the given username and password
  // if err 
  // done(err)
  console.log('Inside local strategy')
  
  //done('invalid password')
  done(null, user)
}))

passport.serializeUser((user, done) => {
  console.log('Serialize User')
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log('Deserialize User')
  // look up user by id in database
  done(null, user)
})



// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'test',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/test", function(req, res) {
res.send('success test')
})

let checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
   return  next();
  }

  res.redirect('/index')
}

app.get('/api/test', checkAuthentication, function (req, res) {
  console.log('Inside secret route')

  res.send('User has access to secret route')
//  res.status(401).send("User does not have access")
});


app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/userRoute")(app);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
 db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
 });

module.exports = app;
