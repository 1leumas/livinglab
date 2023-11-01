// imports
const express = require("express");
require("dotenv").config();

// instancia do servidor Express
const app = express();
const PORT = 5000;

// import das rotas
const homeRoutes = require("./routes/homeRoutes");
const trendsRoutes = require("./routes/trendsRoutes");
const compareRoutes = require("./routes/compareRoutes");
const dbInfoRoutes = require("./routes/dbInfoRoutes");
const corsMiddleware = require("./middleware/corsMiddleware");

// middleware cors
app.use(corsMiddleware);

// definindo as rotas para os endpoints
app.use("/api", homeRoutes, trendsRoutes, compareRoutes);
app.use("/info", dbInfoRoutes);

// iniciando o servidor
app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});
