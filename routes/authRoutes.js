const passport = require("passport");
const { createToken, removeToken } = require("../services/token");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
    if (!req.user) {
      return res.status(401).send();
    }
    let { googleId, name } = req.user;
    let token = createToken({ googleId });
    res.send({ token, name });
  });

  app.post("/api/logout", (req, res) => {
    try {
      removeToken(req.body.token);
    } catch (err) {
      res.status(201).send();
    }
    res.status(200).send();
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
