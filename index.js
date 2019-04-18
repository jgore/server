const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const connectToDb = require("./config/connectToDb");
const keys = require("./config/keys");


require("dotenv/config");
const redisClient = require("./config/connectToCache");

require("./models/User");
require("./models/Message");
require("./services/passport");

connectToDb(keys.mongoURI);
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
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

var port = process.env.PORT || 5000;

console.log(port);
app.listen(port, "0.0.0.0");
