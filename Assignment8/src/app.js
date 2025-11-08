import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";

import routes from "./routes/userRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use("/", routes);

// Swagger docs
const swaggerDocument = YAML.load(path.join(process.cwd(), "src", "docs", "openapi.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// health
app.get("/health", (req, res) => res.json({ ok: true }));

export default app;
