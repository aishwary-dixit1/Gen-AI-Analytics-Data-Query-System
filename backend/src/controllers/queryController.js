import sqlite3 from 'sqlite3';
import { convertToSQL } from "../utils/aiQueryConverter.js";
import env from "../config/env.js";

const sqlite = sqlite3.verbose();
const db = new sqlite.Database(env.dbFile);

export const queryData = async (req, res) => {
    try {
        const { userId } = req.user;
        const { query } = req.body;
        if (!query || !userId) {
            return res.status(400).json({ message: "Invalid Request" });
        }

        const sqlQuery = await convertToSQL(userId, query); // Convert natural language to SQL

        // Insert into the queries table
        db.run(
            "INSERT INTO queries (user_id, query, sql_query) VALUES (?, ?, ?)",
            [userId, query, sqlQuery],
            function (err) {
                if (err) {
                    console.error("Error inserting query into database:", err.message);
                    return res.status(500).json({ message: "Database error", error: err.message });
                }

                res.status(200).json({ 
                    message: "Query saved successfully",
                    queryId: this.lastID,
                    query,
                    sqlQuery 
                });
            }
        );
    } catch (error) {
        console.error("Error in queryController/queryData:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const explainQuery = async (req, res) => {
    try {
        const { sqlQuery } = req.body;
        const explainQuery = `EXPLAIN QUERY PLAN ${sqlQuery}`;

        // Query Execution Plan
        db.all(explainQuery, [], (err, rows) => {
            if (err) {
                res.status(400).json({message:`Error : ${err.message}` });
                return;
            }
            res.json(rows);
        });
    } catch (error) {
        res.status(400).json({message: "Error in queryController/explain"});
    }
};

export const validateQuery = async (req, res) => {
    try {
        const { sqlQuery } = req.body;
        console.log("SQL Query received:", sqlQuery);

        // Try preparing the SQL statement
        const statement = db.prepare(sqlQuery, (err) => {
            if (err) {
                console.log("SQL preparation error:", err.message);
                return res.status(200).json({ valid: false, message: `Error : ${err.message}` });
            }
        });

        if (!statement) {
            return; // If statement is undefined, exit early
        }

        // Try executing the statement safely
        statement.get((err) => {
            if (err) {
                console.log("SQL execution error:", err.message);
                return res.status(200).json({ valid: false, message: `Error : ${err.message}` });
            }

            // If no error, query is valid
            res.json({ valid: true });
        });

        // Properly close the statement after execution
        statement.finalize((finalizeErr) => {
            if (finalizeErr) {
                console.log("Statement finalization error:", finalizeErr.message);
            }
        });

    } catch (error) {
        console.error("Error in validateQuery:", error.message);
        return res.status(500).json({ valid: false, error: "Internal Server Error" });
    }
};

