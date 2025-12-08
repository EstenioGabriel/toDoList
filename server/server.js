// Importa módulos essenciais
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carrega variáveis do arquivo .env
dotenv.config();

// Importa a conexão com o Supabase
const supabase = require('./db');

const app = express();

// Define a porta do servidor (usa a do .env ou 3000 por padrão)
const port = process.env.PORT || 3000;

// Habilita CORS para permitir requisições externas
app.use(cors());

// Permite receber dados em JSON no corpo das requisições
app.use(express.json());

// Rota inicial para verificar se a API está funcionando
app.get('/', (req, res) => {
    res.send('API To-Do funcionando');
});

/* -------------------- LISTAR TAREFAS -------------------- */
app.get('/tasks', async (req, res) => {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
});

/* -------------------- CRIAR TAREFA -------------------- */
app.post('/tasks', async (req, res) => {
    const { title } = req.body;

    // Validação simples
    if (!title) {
        return res.status(400).json({ error: "O campo 'title' é obrigatório" });
    }

    const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, done: false }])
        .select();

    if (error) return res.status(500).json({ error: error.message });

    res.json(data[0]);
});

/* -------------------- DELETAR TAREFA -------------------- */
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: 'Tarefa deletada com sucesso' });
});

/* -------------------- ATUALIZAR TAREFA -------------------- */
app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, done } = req.body;

    const { data, error } = await supabase
        .from('tasks')
        .update({ title, done })
        .eq('id', id)
        .select()
        .single();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
