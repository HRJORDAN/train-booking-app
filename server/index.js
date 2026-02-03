const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const initDB = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        passenger_name VARCHAR(255) NOT NULL,
        train_number VARCHAR(50) NOT NULL,
        source VARCHAR(100) NOT NULL,
        destination VARCHAR(100) NOT NULL,
        journey_date DATE NOT NULL,
        seats INT DEFAULT 1,
        food_opted BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database & Table checked/created successfully.");
    connection.release();
  } catch (err) {
    console.error("DB Init Error:", err);
  }
};

app.get('/api/tickets', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/book', async (req, res) => {
  const { passenger_name, train_number, source, destination, journey_date, seats, food_opted } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO bookings (passenger_name, train_number, source, destination, journey_date, seats, food_opted) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [passenger_name, train_number, source, destination, journey_date, seats, food_opted]
    );
    res.json({ message: "Success", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/cancel/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    res.json({ message: "Ticket cancelled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  setTimeout(initDB, 5000); 
});