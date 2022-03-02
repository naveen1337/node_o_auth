import { Request, Response, NextFunction } from "express";
import Query from "../../modals/crud.queries";

export function validateInput(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.json({
      status: false,
      msg: "invalid input",
    });
  }
}

export function validateAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    if (!authToken) {
      throw new Error("auth token is missing");
    }
    // verify is the authorization token is valid
    /**
     * query auth table
     * is token exists and alive
     * refresh if needed [optional]
     */
    next();
  } catch (err) {
    res.json({
      status: false,
      msg: "invalid authorization token",
    });
  }
}

export async function getUserRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = new Query("Users", "users");
    const dbTxn = await query.getByColumn("email", req.body.email);
    if (!dbTxn.txn) {
      throw new Error("no record found");
    }
    res.locals.info = dbTxn.data[0];
    next();
  } catch (err) {
    res.json({
      status: false,
      msg: "user not found",
    });
  }
}
