import express from "express";
import morganMiddleware from "./middlewares/morgan.middleware";
import env from "lib/env";
import routes from "./routes";
import cors from "cors";
import { startAllSubscribers } from "./queues/subscribers";

const app = express();

//#region middlewares
app.use(express.json());
app.use(morganMiddleware);
app.use(cors());
//#endregion

app.use("/", routes);

startAllSubscribers();

const port = env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
