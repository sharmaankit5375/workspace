const redisClient = require("../config/redis");

/**
 * Generic cache middleware
 * @param {string} keyPrefix - unique prefix for cache key
 * @param {number} ttl - cache TTL in seconds
 */
module.exports = (keyPrefix, ttl = 60) => {
  return async (req, res, next) => {
    try {
      const cacheKey = `${keyPrefix}:${req.originalUrl}`;

      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }

      // Override res.json to store response in cache
      const originalJson = res.json.bind(res);
      res.json = async (body) => {
        await redisClient.setEx(
          cacheKey,
          ttl,
          JSON.stringify(body)
        );
        originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Redis cache error", err);
      next(); // fail-safe: bypass cache
    }
  };
};
