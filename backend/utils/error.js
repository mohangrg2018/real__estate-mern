// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: err.message || "Internal Server Error" });
};

export default errorHandler;
