const redis = require("redis");

let client = null;

(async () => {
  try {
    // client = redis.createClient({
    //   url: process.env.REDIS_URL
    // });
    const client = createClient({
      username: 'default',
      password: '395rDSNk0Pc6aZtQiPiXgplBOs3WdcZo',
      socket: {
        host: 'redis-14468.c251.east-us-mz.azure.cloud.redislabs.com',
        port: 14468
      }
    });

    client.on("error", () => {
      console.warn("⚠️ Redis not available, cache disabled");
    });

    await client.connect();
    console.log("Redis connected");
  } catch {
    console.warn("⚠️ Redis connection failed, continuing without cache");
  }
})();

module.exports = {
  async get(key) {
    if (!client) return null;
    return client.get(key);
  },
  async setEx(key, ttl, value) {
    if (!client) return;
    return client.setEx(key, ttl, value);
  },
  async del(key) {
    if (!client) return;
    return client.del(key);
  }
};
