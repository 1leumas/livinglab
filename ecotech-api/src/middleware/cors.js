const cors = require("cors");
require("dotenv").config();

let url = process.env.CORS_URL;
if (!url || url === "") {
  url = "http://localhost:5173";
}

const corsOptions = {
  origin: url,
  optionsSuccessStatus: 200, //legacy browsers support
};

const corsConfig = cors(corsOptions);

module.exports = corsConfig;
