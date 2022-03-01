import { Request, Response, NextFunction } from "express";
import code from "../constants/app.response";
import { ApiError } from "../sharedtypes/generic";

export default function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    status: false,
    msg: "unhandled error",
  });
}
