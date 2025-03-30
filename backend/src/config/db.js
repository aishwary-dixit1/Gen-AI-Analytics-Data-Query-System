import sqlite3 from "sqlite3";
import env from "./env.js";

const db = new sqlite3.Database(env.dbFile, (err) => {
    if (err) console.error("Database Connection Error:", err);
    else console.log("SQLite Database Connected");
});

db.serialize(() => {
    // Users Table (For authentication)
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

    // Queries Table (Stores user queries)
    db.run(`
        CREATE TABLE IF NOT EXISTS queries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            query TEXT NOT NULL,
            sql_query TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `);

    // Products Table (For product details)
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL
        )
    `);

    // Sales Table (Linked to users & products)
    db.run(`
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            product_id INTEGER,
            customer_name TEXT,
            quantity INTEGER,
            revenue REAL,
            sale_date TEXT,
            month TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
        )
    `);

    console.log("✅ All Tables Created with Relationships");
});



//Mock Data Insertion
db.serialize(() => {
    // Insert mock users (if empty)
    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
        if (row.count === 0) {
            db.run(`INSERT INTO users (name, email, password) VALUES 
                ('John Doe', 'john@example.com', 'hashedpassword123'),
                ('Jane Smith', 'jane@example.com', 'hashedpassword456')`);
            console.log("✅ Mock Users Inserted");
        }
    });

    // Insert mock products (if empty)
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (row.count === 0) {
            db.run(`INSERT INTO products (name, category, price) VALUES 
                ('Laptop', 'Electronics', 1200.00),
                ('Smartphone', 'Electronics', 800.00),
                ('Headphones', 'Accessories', 150.00),
                ('Desk Chair', 'Furniture', 300.00)`);
            console.log("✅ Mock Products Inserted");
        }
    });

    // Insert mock sales data (if empty)
    db.get("SELECT COUNT(*) as count FROM sales", (err, row) => {
        if (row.count === 0) {
            db.run(`INSERT INTO sales (user_id, product_id, customer_name, quantity, revenue, sale_date, month) VALUES 
                (1, 1, 'Alice Johnson', 2, 2400.00, '2024-03-15', 'March'),
                (2, 2, 'Bob Brown', 1, 800.00, '2024-03-20', 'March'),
                (1, 3, 'Charlie Davis', 3, 450.00, '2024-04-05', 'April'),
                (2, 4, 'David Evans', 1, 300.00, '2024-04-10', 'April')`);
            console.log("✅ Mock Sales Data Inserted");
        }
    });
});

export default db;
