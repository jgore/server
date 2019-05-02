const { getFromRedis } = require("../../config/connectToCache");
const { getFromJWT } = require("../../services/jwt");

exports.privateRoute = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).send();
  }
  getFromRedis(req.headers.token, (err, secret) => {
    if (err) {
      return res.status(401).send();
    }
    try {
      let decoded = getFromJWT(secret);
      req.session = decoded;
      next();
    } catch (err) {
      return res.status(401).send();
    }
  });
};
