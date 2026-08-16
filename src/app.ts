import express, { Application } from "express";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8081",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow mobile apps & direct API clients

      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.includes("hamim.dpdns.org") ||
        origin.includes("dpdns.org") ||
        origin.includes("trycloudflare.com") ||
        origin.endsWith(".vercel.app") ||
        origin.includes("localhost") ||
        origin.startsWith("http://10.") ||
        origin.startsWith("http://192.168.");

      if (isAllowed) {
        callback(null, true);
      } else {
        // Fallback to allowing instead of crashing with 500 error for mobile app headers
        callback(null, true);
      }
    },
    credentials: true,
  }),
);

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("my-server is running............");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
