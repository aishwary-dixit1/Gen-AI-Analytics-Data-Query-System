import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

// Signup
export const registerUser = (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        // Insert into the user table
        db.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword],

            function (err) {
                if (err) return res.status(400).json({ error: "Email already exists" });

                res.json({ message: "User registered successfully", userId: this.lastID });
            }
        );
    } catch (error) {
        res.status(400).json({message: `Error in authController/registerUser : ${error.message}`});
    }
};

// Login
export const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;

        // Searching for user in user table
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
            if (err || !user) return res.status(400).json({ error: "Invalid email or password" });

            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

            const token = jwt.sign({ userId: user.id, email: user.email }, env.jwtSecret, { expiresIn: "1d" });
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None'});

            const userId = user.id;

            res.json({ message: "Login successful", userId });
        });
    } catch (error) {
        res.status(400).json({message: `Error in authController/loginUser : ${error.message}`});
    }
};

// Logout 
export const logoutUser = (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
        });
        res.status(200).send("Logout successful");
    } catch (error) {
        res.status(400).json({message: `Error in authController/logoutUser : ${error.message}`});
    }
};
