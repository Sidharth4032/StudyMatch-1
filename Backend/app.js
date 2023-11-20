require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Rate limit configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
});

// Apply rate limiting to all requests
app.use(limiter);

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
  connection.release();
});

app.get("/ping", (req, res) => {
  return res.send({ status: "Healthy" });
});

// User registration
app.post("/register", [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  // Check if user already exists
  pool.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      return res.status(500).send("Database error");
    }

    if (results.length > 0) {
      return res.status(400).send("Username already taken");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10); 
      const query = "INSERT INTO users (username, password) VALUES (?, ?)";
      pool.query(query, [username, hashedPassword], (err) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          return res.status(500).send("Database error");
        }
        res.send({ status: "User registered successfully!" });
      });
    }
  });
});

// User login
app.post("/login", [
  body('username').trim().escape(),
  body('password').exists()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const query = "SELECT password FROM users WHERE username = ?";
  pool.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      return res.status(500).send("Database error");
    }
    
    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      return res.status(401).send("Invalid username or password");
    }

    // Generate JWT Token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ status: "Login successful!", token });
  });
});

// JWT verification middleware
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    jwt.verify(req.token, JWT_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
}

// Trying to implement a protected route
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.authData });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log("Server started listening on port:", PORT);
});
