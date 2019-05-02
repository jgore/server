const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");
const {
  addToRedis,
  getFromRedis,
  removeFromRedis
} = require("../config/connectToCache");

exports.createToken = payload => {
  let secret = jwt.sign(payload, process.env.JWT_SECRET);
  let token = uniqid("token-");
  addToRedis(token, secret);
  return token;
};

exports.checkToken = token => {
  return getFromRedis(token, (err, secret) => {
    if (err) {
      return err;
    }
    return secret;
  });
};

exports.removeToken = token => {
  removeFromRedis(token);
};
