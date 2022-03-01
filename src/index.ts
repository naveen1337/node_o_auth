"use strict";
import express from "express";
import "dotenv/config";
import morgan from "morgan";
// Routes
import oAuthRoutes from "./routes/oAuth.routes";
import error from "./middlewares/error.middleware";
import schema from "./modals/queries"
import { createClient } from "redis";
import path from "path";

const log = console.log;

// console.log(schema.authTableSchema());

const app = express();
const PORT = process.env.PORT || 5000;
console.log("\n---------------");

// redis connection
// (async () => {
// const redisClient = createClient();
//   await redisClient.connect();
// })();

// Global Middlware Initialization
app.post("*", express.json());
app.use(morgan(":method :url :status - :response-time ms"));

// app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes Initialization
app.use("/auth", oAuthRoutes);

app.get("/", async (req, res): any => {
  res.json({
    instance: "OAuth Server",
    status: "live",
  });
  return;
});

app.get("/login", (req, res) => {
  res.render("index");
});

app.use(error);

app.listen(PORT, () => {
  console.log(`App Listening on ${PORT}`);
});
