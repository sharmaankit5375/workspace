const { v4: uuid } = require("uuid");

module.exports = (req, res, next) => {
  const id = req.headers["x-correlation-id"] || uuid();
  req.correlationId = id;
  res.setHeader("x-correlation-id", id);
  next();
};
