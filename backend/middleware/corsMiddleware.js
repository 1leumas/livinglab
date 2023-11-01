const cors = require('cors');

// config do CORS
const corsOptions = {
  origin: 'http://localhost:3000', // URL do frontend
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
