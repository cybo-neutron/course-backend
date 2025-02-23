import winston from "winston";

const { combine, timestamp, printf, colorize, align, errors, json } =
  winston.format;

const logger = winston.createLogger({
  level: "http",
  format: combine(
    colorize({ all: true }),
    errors({ stack: true }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    align(),
    printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${info.message} ${info.stack ? `\n${info.stack}` : ""}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    //   filename: "combined.log",
    // }),
    // new winston.transports.File({
    //   filename: "error.log",
    //   level: "error",
    // }),
  ],
});

export default logger;

// logger.info("Hello World");
// logger.error("Hello World");
// try {
//   try {
//     throw new Error("Hello World");
//   } catch (error) {
//     throw error;
//   }
// } catch (error) {
//   logger.error(error);
//   // console.log(error)
// }
