export const queryPrompt = (userId, naturalQuery ) => { return `You are an expert SQL developer. Your task is to convert natural language queries into valid SQL queries, considering the userId (primary key of sql database) that can be executed on a database. All generated SQL queries MUST filter results based on the provided user_id.

Here is the database schema:

users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)

queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    query TEXT NOT NULL,
    sql_query TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
)

products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL
)

sales (
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

Generate the SQL query based on the following natural language input. Provide ONLY the SQL query, without any explanations or additional text. Ensure the generated query filters based on the provided user_id.

User ID: ${userId}

Natural Language Query: ${naturalQuery}` }