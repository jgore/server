const jwt = require("jsonwebtoken");

exports.getFromJWT = secret => {
  return jwt.verify(secret, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Secret is incorrect");
    }
    return decoded;
  });
};
