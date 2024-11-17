import logger from "@utils/logger";
import morgan from "morgan";

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => logger.http(message),
    },
  }
);

export default morganMiddleware;
