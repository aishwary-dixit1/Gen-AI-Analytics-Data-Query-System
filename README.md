
# **Gen AI Backend - Data Query Simulation Engine**  
This is a lightweight backend service that simulates a simplified version of GrowthGear's Gen AI Analytics tool. It provides a REST API to convert natural language queries into SQL and executes them against a mock SQLite database.  

### **Deployed on Render** - https://gen-ai-analytics-data-query-system.onrender.com

## **Table of Contents**  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Setup Instructions](#setup-instructions)  
- [API Documentation](#api-documentation)  
- [Sample Queries](#sample-queries)  
- [License](#license)  

---

## **Features**  
✅ Convert natural language queries to SQL using AI  
✅ Validate SQL queries before execution  
✅ Execute queries on a mock SQLite database  
✅ User authentication with JWT  
✅ Secure API with authentication middleware  

---

## **Tech Stack**  
- **Backend:** Node.js, Express.js  
- **Database:** SQLite (file-based)  
- **Authentication:** JWT (JSON Web Tokens)  
- **AI Query Processing:** Google Gemini Ai  

---

## **Project Structure**  
```
/gen-ai-backend
│── /src
│   ├── /config
│   │   ├── db.js  (Database connection)
│   │   ├── env.js (Environment variables)
│   ├── /constants
│   │   ├── constant.js  (Prompt)
│   ├── /middlewares
│   │   ├── authMiddleware.js (JWT authentication)
│   ├── /controllers
│   │   ├── queryController.js (Handles AI query processing)
│   │   ├── authController.js (Handles authentication)
│   ├── /routes
│   │   ├── queryRoutes.js (Query processing routes)
│   │   ├── authRoutes.js (Authentication routes)
│   ├── /utils
│   │   ├── aiQueryConverter.js (Converts natural queries to SQL)
├── server.js (Main entry point)
│── .env  (Environment variables)
│── package.json
│── README.md
```

---

## **Setup Instructions**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-repo/gen-ai-backend.git
cd gen-ai-backend
```

### **2️⃣ Build the project**  
```sh
npm run build
```

### **3️⃣ Configure Environment Variables**  
Create a `.env` file in the root directory and add the following:  
```env
PORT=5000
JWT_SECRET=your_secret_key
DB_FILE=database.sqlite
GEMINIAI_API_KEY=your_openai_key
```

### **4️⃣ Start the Server**  
```sh
npm start
```
The server will run on **http://localhost:5000**.

---

## **API Documentation**  

### **🔹 User Authentication**  

#### **1️⃣ Register User**  
**Endpoint:** `POST /api/auth/register`  
**Request Body:**  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**  
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

#### **2️⃣ Login User**  
**Endpoint:** `POST /api/auth/login`  
**Request Body:**  
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**  
```json
{
  "message": "Login successful",
  "userId": 1
}
```

---

### **🔹 Query Processing**  

#### **3️⃣ Convert Natural Language to SQL**  
**Endpoint:** `POST /api/query`  
**Request Body:**  
```json
{
  "query": "Show me total revenue for March",
  "userId": 1
}
```
**Response:**  
```json
{
  "message": "Query saved successfully",
  "queryId": 10,
  "query": "Show me total revenue for March",
  "sqlQuery": "SELECT SUM(revenue) FROM sales WHERE month='March'"
}
```

#### **4️⃣ Explain Query Plan**  
**Endpoint:** `POST /api/query/explain`  
**Request Body:**  
```json
{
  "sqlQuery": "SELECT SUM(revenue) FROM sales WHERE month='March'"
}
```
**Response:**  
```json
[
  {
    "detail": "SCAN TABLE sales"
  }
]
```

#### **5️⃣ Validate SQL Query**  
**Endpoint:** `POST /api/query/validate`  
**Request Body:**  
```json
{
  "sqlQuery": "SELECT * FROM sales WHERE month='March'"
}
```
**Response:**  
```json
{
  "valid": true
}
```

---

## **Sample Queries & Expected Outputs**  

| Natural Language Query            | Converted SQL Query |
|------------------------------------|----------------------------------------|
| "Show me total revenue"           | `SELECT SUM(revenue) FROM sales;` |
| "Count the number of sales"       | `SELECT COUNT(*) FROM sales;` |
| "Show all sales in March"         | `SELECT * FROM sales WHERE month='March';` |
| "Get top 5 selling products"      | `SELECT product_id, COUNT(*) FROM sales GROUP BY product_id ORDER BY COUNT(*) DESC LIMIT 5;` |

---

## **License**  
This project is licensed under the MIT License.  

---
