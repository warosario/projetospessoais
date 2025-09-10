// server.js
import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco',
  password: 'sua_senha',
  port: 5432,
});

app.post('/api/releases', async (req, res) => {
  try {
    const { name, version, author, description, release_date, extraction_period } = req.body;
    const result = await pool.query(
      `INSERT INTO releases (name, version, author, description, release_date, extraction_period)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
      [name, version, author, description, release_date, extraction_period]
    );
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar release' });
  }
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
