export const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  res.status(err.statusCode||500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};
