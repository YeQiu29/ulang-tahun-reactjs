require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Sajikan file statis dari direktori build React
// Request ke root (/) atau file di /assets akan dilayani dari sini
app.use(express.static(path.join(__dirname, '../dist')));

// Buat koneksi database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Hubungkan ke database
db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Rute API untuk menyimpan ucapan
app.post('/api/wishes', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const query = 'INSERT INTO wishes (message) VALUES (?)';
  db.query(query, [message], (err, result) => {
    if (err) {
      console.error('Error inserting wish:', err);
      return res.status(500).json({ error: 'Failed to save wish' });
    }
    res.status(201).json({ success: true, message: 'Wish saved successfully' });
  });
});

// Rute API untuk menyimpan nama pengunjung
app.post('/api/visitors', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const query = 'INSERT INTO visitors (name) VALUES (?)';
  db.query(query, [name], (err, result) => {
    if (err) {
      console.error('Error inserting visitor:', err);
      return res.status(500).json({ error: 'Failed to save visitor' });
    }
    res.status(201).json({ success: true, message: 'Visitor saved successfully' });
  });
});

// Catch-all: Kirim semua request lain ke aplikasi React
// Ini harus diletakkan setelah semua rute API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});