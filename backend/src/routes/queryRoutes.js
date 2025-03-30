import express from "express";
import { queryData, explainQuery, validateQuery } from "../controllers/queryController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const queryRouter = express.Router();

queryRouter.post("/query", authenticateUser, queryData);
queryRouter.post("/explain", authenticateUser, explainQuery);
queryRouter.post("/validate", authenticateUser, validateQuery);

export default queryRouter;
