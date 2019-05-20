const express = require("express");
const fs = require("fs");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const connectToDb = require("./config/connectToDb");
const keys = require("./config/keys");

require("dotenv/config");
const redisClient = require("./config/connectToCache");
const logWriteStream = fs.createWriteStream("log.txt", { flags: "a+" });
require("./models/User");
require("./models/Message");
require("./services/passport");

connectToDb(keys.mongoURI);
const app = express();
const bodyParser = require("body-parser");

process.on("uncaughtException", function(err) {
  console.log(err instanceof Error)
  if (err instanceof Error === false) {
    logWriteStream.write(
      `\r\n[Error] ${JSON.stringify(err, undefined, 2)}\r\n`
    );
  } else {
    logWriteStream.write(`\r\n[Error] ${err}\r\n`);
  }

  logWriteStream.end(
    "\r\n -------------------------------END-------------------------------"
  );
});

process.on("exit", function() {
  logWriteStream.end();
});


app.use(cors());
app.use((req, res, next) => {
  logWriteStream.write(`\r\n[${req.method}] ${req.url}`);
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/mailRoutes")(app);
require("./routes/publicRoutes")(app);
require("./routes/reviewsRoutes")(app);
require("./routes/commentRoutes")(app);

var port = process.env.PORT || 5000;

console.log(port);
app.listen(port, "0.0.0.0");

module.exports = app;
