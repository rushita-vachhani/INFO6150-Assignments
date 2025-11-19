import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";
import multer from "multer"; // for error-type checks

import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// serve uploaded files
app.use("/images", express.static(path.join(process.cwd(), "images")));

// Swagger docs
const swaggerDocument = YAML.load(
  path.join(process.cwd(), "docs/openapi.yaml")
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/", userRoutes);
app.use("/api", jobRoutes);

// health
app.get("/health", (req, res) => res.json({ ok: true }));

// ----- Global error handler (keeps invalid image format as 400 JSON) -----
app.use((err, req, res, next) => {
  if (
    err instanceof multer.MulterError ||
    (typeof err?.message === "string" &&
      err.message.includes("Invalid file format"))
  ) {
    return res
      .status(400)
      .json({ error: "Invalid file format. Only JPEG, PNG, and GIF are allowed." });
  }
  console.error(err);
  return res.status(500).json({ error: "Server error" });
});

export default app;
