export const logRequest = (req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
    next();
  }
  