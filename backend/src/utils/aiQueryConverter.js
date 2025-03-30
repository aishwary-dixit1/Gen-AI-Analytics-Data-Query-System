import env from "../config/env.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { queryPrompt } from "../constants/constant.js";

const genAI = new GoogleGenerativeAI(env.geminiAiApiKey);

export const convertToSQL = async (userId, naturalQuery) => {
    try {
        // Response from Gemini Ai 
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(queryPrompt(userId, naturalQuery));
        const response = await result.response;

        if (response && response.candidates && response.candidates.length > 0 && response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts.length > 0) {
            const text = response.candidates[0].content.parts[0].text;

            // Extract SQL Query from the text
             const sqlRegex = /```sql\n([\s\S]*?)\n```/;
             const match = text.match(sqlRegex);

             let sqlQuery = null;
             if(match && match[1]){
               sqlQuery = match[1];
             } else {
               sqlQuery = text; // if the regex fails, return the text, it might be the query.
             }

            return sqlQuery;
        } else {
            console.error("Unexpected response structure:", response);
            return `SELECT * FROM sales WHERE user_id = ${userId};`; // Fallback query if response is unexpected
        }

    } catch (error) {
        console.error("Error:", error);
        return `SELECT * FROM sales WHERE user_id = ${userId}`; // Default fallback query
    }
};