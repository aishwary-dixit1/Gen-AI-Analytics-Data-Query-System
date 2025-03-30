import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT, // Port
    dbFile: process.env.DB_FILE, // Database File
    jwtSecret: process.env.JWT_SECRET, // JWT Secret Key
    geminiAiApiKey: process.env.GEMINIAI_API_KEY, // Gemini Ai Api Key
    node_env: process.env.NODE_ENV,
};
