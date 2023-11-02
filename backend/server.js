// Importações
const express = require("express");
require("dotenv").config();

/**
 * Configuração e inicialização do servidor Express.
 *
 * @module Server
 */

/**
 * Instância do servidor Express.
 * @type {Express}
 */
const app = express();

/**
 * Porta na qual o servidor será executado.
 * @type {number}
 */
const PORT = process.env.PORT || 5000;

/**
 * Importação das rotas.
 */
const homeRoute = require("./routes/homeRoute");
const particulasRoute = require("./routes/particulasRoute");
const aeroportoRoute = require("./routes/aeroportoRoute");
const cruzeiroRoute = require("./routes/cruzeiroRoute");
const dbInfoRoute = require("./routes/dbInfoRoute");

/**
 * Importação do middleware de CORS.
 */
const corsMiddleware = require("./middleware/corsMiddleware");

/**
 * Configuração do middleware de CORS.
 */
app.use(corsMiddleware);

/**
 * Definição das rotas para os endpoints.
 */
app.use("/api", homeRoute, particulasRoute, aeroportoRoute, cruzeiroRoute);
app.use("/info", dbInfoRoute);

/**
 * Inicialização do servidor.
 */
app.listen(PORT, () => {
  console.log(`Servidor executando na porta: ${PORT}`);
});
