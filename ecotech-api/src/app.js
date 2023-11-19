const express = require("express");
const apiRouter = require("./routes");
const corsConfig = require("./middleware/cors");

const app = express();

app.use(corsConfig);
app.use("/api", apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
