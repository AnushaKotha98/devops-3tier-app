const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const connectDB = () => {
  const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "password",
    database: "devops_db",
  });

  db.connect((err) => {
    if (err) {
      console.log("DB not ready, retrying in 5 sec...");
      setTimeout(connectDB, 5000);
    } else {
      console.log("Connected to MySQL");
    }
  });

  return db;
};

const db = connectDB();

// 🔥 ADD user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("User added");
    }
  );
});

// health check
app.get("/health", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});