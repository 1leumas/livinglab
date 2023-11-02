const { Pool } = require("pg");

/**
 * Configuração do pool de conexões com o banco de dados PostgreSQL.
 * O pool de conexões mantém várias conexões abertas e as reutiliza,
 * melhorando a eficiência e a performance das operações no banco de dados.
 *
 * @module DbPool
 */

/**
 * Cria uma nova instância do pool de conexões com as configurações definidas.
 * As configurações são obtidas a partir de variáveis de ambiente.
 * @type {Pool}
 */
const pool = new Pool({
  // Endereço do servidor do banco de dados
  host: process.env.DB_HOST,

  // Usuário para acessar o banco de dados
  user: process.env.DB_USER,

  // Senha para acessar o banco de dados
  password: process.env.DB_PASSWORD,

  // Nome do banco de dados
  database: process.env.DB_NAME,

  // Porta para acessar o banco de dados
  port: process.env.DB_PORT,
});

module.exports = pool;
