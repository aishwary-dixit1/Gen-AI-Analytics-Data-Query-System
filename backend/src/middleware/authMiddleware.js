import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const authenticateUser = (req, res, next) => {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) return res.status(401).json({ error: "Access denied. You are not authorized." });

    try {
        const decoded = jwt.verify(token, env.jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};
