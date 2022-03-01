/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Router } from "express";
import { authenticate } from "../controllers/oAuth/oAuth.controller";
import {
  getUserRecord,
  validateInput,
} from "../controllers/oAuth/oAuth.middlewares";
import auth from "../middlewares/auth.middleware";

const router: Router = express.Router({
  caseSensitive: true,
  strict: true,
});

router.post("/authenticate", [validateInput, getUserRecord], authenticate);

export default router;
