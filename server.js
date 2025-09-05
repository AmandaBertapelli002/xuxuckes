const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Permite servir arquivos estáticos da raiz
app.use(express.static(__dirname));

// Lê JSON enviado pelo formulário
app.use(express.json());

// Caminho absoluto para posts.json
const postsFile = path.join(__dirname, 'posts.json');

// GET: retorna posts
app.get('/posts', (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ler posts.json' });
  }
});

// POST: adiciona post
app.post('/add-post', (req, res) => {
  const { title, date, excerpt } = req.body;

  if (!title || !date || !excerpt) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf8'));
    posts.push({ title, date, excerpt });
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2)); // escreve no JSON
    res.json({ success: true, message: 'Post adicionado!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar posts.json' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
