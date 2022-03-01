import { Request, Response } from "express";

export function authenticate(req: Request, res: Response) {
  try {
    if (req.body.password !== res.locals.info.password) {
      res.status(400).json({
        status: false,
        msg: "authentication failed",
      });
      return;
    }
    // token generation will be here
    throw new Error("pending ...");
  } catch (err) {
    res.status(400).json({
      status: false,
      msg: "authorization failed",
    });
  }

  console.log(res.locals.info);
  res.json(1);
}
