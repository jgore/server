const redis = require("redis");

const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

client.on("error", function(err) {
  throw new Error(`Problem with Redis connection`);
});

client.on("connect", function() {
  console.log("[REDIS] Connection has been established");
});

const addToRedis = (key, value) => {
  client.set(key, value);
};

const getFromRedis = (key, callback) => {
  client.get(key, (err, reply) => {
    if (err) {
      return callback(err);
    }
    callback(null, reply);
  });
};

const removeFromRedis = key => {
  client.del(key);
};

module.exports = {
  client,
  addToRedis,
  getFromRedis,
  removeFromRedis
};
