import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};
export default errorMiddleware;
