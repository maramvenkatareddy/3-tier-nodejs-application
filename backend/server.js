require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors());  // restrict to your frontend origin
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const result = await pool.query(
    'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *',
    [name, email]
  );
  res.json(result.rows[0]);
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Backend server running on port 5000');
});
