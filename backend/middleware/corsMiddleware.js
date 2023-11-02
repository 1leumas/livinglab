const cors = require("cors");

/**
 * Configuração do CORS (Cross-Origin Resource Sharing).
 * CORS é um mecanismo que permite que recursos em uma página web sejam
 * solicitados de um domínio diferente do domínio da própria aplicação.
 *
 * @module CorsMiddleware
 */

/**
 * Opções de configuração do CORS.
 * @type {Object}
 */
const corsOptions = {
  // URL do frontend que está permitido acessar os recursos do backend
  origin: "http://localhost:3000",

  // Código de status HTTP a ser retornado para navegadores antigos que
  // podem ter problemas com o código de status padrão 204.
  optionsSuccessStatus: 200,
};

/**
 * Middleware do Express para habilitar o CORS com as opções definidas.
 * @type {Function}
 */
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
