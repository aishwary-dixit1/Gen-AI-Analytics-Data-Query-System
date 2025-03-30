import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import queryRoutes from "./src/routes/queryRoutes.js";
import env from "./src/config/env.js";
import cookieParser from "cookie-parser";

import path from "path";

const __dirname = path.resolve();

const app = express();

app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", queryRoutes);

if(env.node_env === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
