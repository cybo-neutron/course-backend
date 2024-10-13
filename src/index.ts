import dotenv from "dotenv";
import path from "path";
const { NODE_ENV } = process.env;
dotenv.config({
  path:
    NODE_ENV === "local"
      ? path.join(__dirname, "..", ".env.local")
      : path.join(__dirname, "..", ".env.prod"),
});

import express from "express";
const app = express();

//#region middlewares
app.use(express.json());
//#endregion

app.get("/", async (req, res) => {
  res.json({
    message: "Hello from express server",
  });
});

const port = process.env.PORT || "5100";
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
