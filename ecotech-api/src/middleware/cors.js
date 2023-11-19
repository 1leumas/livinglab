const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200, //legacy browsers support
};

const corsConfig = cors(corsOptions);

module.exports = corsConfig;
