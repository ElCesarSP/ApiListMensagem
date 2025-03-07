import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configurando o banco de dados PostgreSQL
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://user:password@localhost:5432/meubanco',
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API rodando com Express e PostgreSQL!');
});

app.get('/category', (req, res) => {
  res.send('API test');
});

app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Conexão com o banco bem-sucedida!',
      time: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log('Service rodando');
});
