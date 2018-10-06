var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("start", {
      disc: `DISCLAIMER: The information contained herein should NOT be used as a substitute for the advice of an
      appropriately qualified and licensed physician or other health care provider.
      The information provided here is for informational purposes only. This tool may not cover all possible drug
      interactions.
      
      Please check with a physician if you have health questions or concerns. Although we attempt to provide accurate
      and up-to-date information, no guarantee is made to that effect.`
    });
  });

  app.get("/index", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "RX",
        examples: dbExamples
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
