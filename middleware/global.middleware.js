const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("duplicate key error")
  ) {
    const regex = /index: (\w+).*dup key: { (\w+): "([^"]+)" }/;
    const match = error.message.match(regex);
    const key = match[2];
    const value = match[3];
    return res.status(400).json({ error: `${key} : ${value}, already exists` });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  }
  next(error);
};

export { errorHandler };
