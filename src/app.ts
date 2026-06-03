import express from "express";

import helmet from "helmet";

import cors from "cors";

import morgan from "morgan";

import rateLimit from "express-rate-limit";
import path from "path";
import { UploadRouter } from "./modules/upload/upload.routes.js";
import { AuthRouter } from "./modules/auth/auth.routes.js";

import { errorMiddleware } from "./shared/middlewares/error.middleware.js";
import { ProfileRouter } from "./modules/profile/profile.routes.js";
import { CampaignRouter } from "./modules/campaign/campaign.routes.js";
import { ApplicationRouter } from "./modules/applications/application.routes.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,

    max: 100,
  }),
);
app.use("/api/auth", AuthRouter);

app.use("/api/profile", ProfileRouter);
app.use("/api/campaigns", CampaignRouter);

app.use("/api/upload", UploadRouter);
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use((_req, res) =>
  res.status(404).json({
    success: false,

    error: "Route not found",
  }),
);
app.use("/api/applications", ApplicationRouter);
app.use(errorMiddleware);

export default app;
