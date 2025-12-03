require('dotenv').config(); 
// Carrega as variáveis do arquivo .env para process.env

const { createClient } = require('@supabase/supabase-js');
// Importa a função responsável por criar o cliente do Supabase

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
// Lê as credenciais do Supabase definidas no arquivo .env

if (!supabaseUrl || !supabaseKey) {
    console.log("ERRO: SUPABASE_URL ou SUPABASE_KEY não encontrados no .env");
    process.exit(1);
}
// Verifica se as variáveis existem.
// Se não existirem, encerra a aplicação imediatamente.

const supabase = createClient(supabaseUrl, supabaseKey);
// Inicializa o cliente do Supabase usando URL e Key


module.exports = supabase;
// Exporta o cliente para ser usado em outras partes do projeto
