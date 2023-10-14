// Core Modules
import http from "http";

// Third Party Modules
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import ExpressMongoSanitize from "express-mongo-sanitize";
import session from "express-session";
import helmet from "helmet";
import { config } from "dotenv";

import { connectToDb } from "./config/connectToDb";

config();
const app = express();

app.use(
  cors({
    origin: true,
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.JWT_SEC,
    saveUninitialized: true,
    resave: true,
  }),
);

app.use(ExpressMongoSanitize());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello from Phonic");
});

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log("Server running on port", PORT);
  await connectToDb();
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Gracefully Shutdown the server.
process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
