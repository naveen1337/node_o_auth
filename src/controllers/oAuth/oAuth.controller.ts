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
    /**
     * [] generate authorization token with expiration, and permission levels
     * [] store it on auth table
     * [] send to user with callback url 
     */
    throw new Error("pending ...");
  } catch (err) {
    res.status(400).json({
      status: false,
      msg: "authorization failed",
    });
  }
}

export function provideAccessToken(req: Request, res: Response) {
  try {
    // token generation will be here
    /**
     * [] create a access token (jwt) with expiration time and permission levels
     * [] store it on session table
     * [] send in to the user 
     */
    throw new Error("pending ...");
  } catch (err) {
    res.status(400).json({
      status: false,
      msg: "access token failed",
    });
  }
}


