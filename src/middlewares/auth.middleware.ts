import { Request, Response, NextFunction } from "express";
import code from "../constants/app.response";
import { decode, verify } from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    if (!authToken) {
      throw new Error("auth header is missing");
    }
    // verify JWT token
    const token = verify(
      authToken,
      process.env.JWT_SECRET,
      (err: any, data: any) => {
        if (err && err.name === "TokenExpiredError") {
          // try to refresh a token
          const sid = decode(authToken);
          console.log(sid);

          throw new Error(err.message);
        } else {
          res.locals.sId = data.sId;
          res.locals.userId = data.userId;
          res.locals.authLevel = data.authLevel;
          next();
        }
      }
    );
  } catch (err: any) {
    res.status(code.FORBIDDEN).json({
      status: false,
      msg: `${err.message}`,
    });
  }
}

const failResponse = (statusCode: number, message: string) => {
  const obj: any = {
    statusCode,
    message,
  };
};
