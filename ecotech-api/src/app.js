const express = require("express");
const apiRouter = require("./routes");
const corsConfig = require("./middleware/cors");

const app = express();

app.use(corsConfig);
app.use("/api", apiRouter);

let port = process.env.PORT;

if (!port || port === "") {
  port = 3000;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
