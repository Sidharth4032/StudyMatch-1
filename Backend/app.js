require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql2");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const utils = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

const JWT_SECRET = process.env.JWT_SECRET;
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

const dbConfig = { host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME };
const pool = mysql.createPool(dbConfig);
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
  connection.release();
});

app.get("/ping", (req, res) => res.send({ status: "Healthy" }));

app.post("/register", [ body('username').isLength({ min: 3 }).trim().escape(), body('password').isLength({ min: 5 }) ], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;
  pool.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).send("Database error");

    if (results.length > 0) return res.status(400).send("Username already taken");

    const hashedPassword = await bcrypt.hash(password, 10); 
    pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err) => {
      if (err) return res.status(500).send("Database error");
      res.send({ status: "User registered successfully!" });
    });
  });
});

app.post("/login", [ body('username').trim().escape(), body('password').exists() ], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;
  pool.query("SELECT password FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).send("Database error");
    
    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) return res.status(401).send("Invalid username or password");

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ status: "Login successful!", token });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) return res.status(401).send({ error: "Access denied. No token provided." });

  const token = bearerHeader.split(' ')[1];
  if (!token || token.split('.').length !== 3) return res.status(401).send({ error: "Invalid token format." });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Failed to authenticate token." });

    req.user = decoded;
    next();
  });
}

app.get("/protected", verifyToken, (req, res) => res.json({ message: "This is a protected route", user: req.user }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => console.log("Server started listening on port:", PORT));
