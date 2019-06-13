var db = require("../models");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("1b52f242b6544eddba125c9fb88612e1");
const Request = require("request");
module.exports = app => {
  // Get all users
  app.get("/api/users", (req, res) => {
    console.log("app get users");
    console.log(req.body);
    db.users.findAll({}).then(result => {
      res.json(result);
    });
  });

  //should get your info on login ...
  app.get("/api/users/:userName", (req, res) => {
    console.log("aR 17: " + req.userName);
    db.users
      .findOne({
        where: {
          userName: req.params.userName
        }
      })
      .then(result => {
        res.json(result);
      });
  });
  // Create a new user (for prefernces page)
  app.post("/api/users", function(req, res) {
    console.log("aR 30: " + JSON.stringify(req.body));
    db.users.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  //get one user by username
  app.get("/api/users/:id", (req, res) => {
    db.users
      .findOne({
        where: {
          userName: req.params.users.userName
        }
      })
      .then(result => {
        res.json(result);
      });
  });

  //not needed?
  app.post("api/users/:id", (req, res) => {
    db.users.findOne({}).then(result => {
      res.json(result);
    });
  });
  //not needed?
  app.put("api/users/:id", (req, res) => {
    db.users.findOne({}).then(result => {
      res.json(result);
    });
  });

  app.post("/api/login", function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/userProfile");
  });

  // Delete an example by id, not needed
  app.delete("/api/examples/:id", (req, res) => {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbExample => {
      res.json(dbExample);
    });
  });
  //================================================================= EXTERNAL API REQUESTS
  app.get("/quote", (req, res) => {
    Request.get(
      "http://quotes.stormconsultancy.co.uk/random.json",
      (error, response, body) => {
        if (error) {
          return console.dir(error);
        }
        console.dir(JSON.parse(body));
        res.json(response);
      }
    );
  });
  //News API get request
  app.get("/news", (req, res) => {
    newsapi.v2
      .topHeadlines({
        country: "us"
      })
      .then(response => {
        res.json(response);
      });
  });
};
