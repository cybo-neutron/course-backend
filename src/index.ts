import express from "express";
import morganMiddleware from "./middlewares/morgan.middleware";
import env from "lib/env";
import routes from "./routes";
import cors from "cors";

const app = express();

//#region middlewares
app.use(express.json());
app.use(morganMiddleware);
app.use(cors());
//#endregion

//#region routes
app.use("/", routes);
// app.get("/", async (req, res) => {
//   res.json({
//     message: "Hello from express server",
//   });
// });
//#endregion

const port = env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
