import { convertDateToTimestamp } from "./date";
import loadEnvVariable from "./env";
import { LogLevel, ValidLogLevel } from "../types/logger";

class Logger {
  private envLogLevel: ValidLogLevel;
  private logLevel: LogLevel;

  constructor(logLevel: LogLevel = LogLevel.DEBUG) {
    this.envLogLevel = loadEnvVariable("LOG_LEVEL") as ValidLogLevel;
    this.logLevel = LogLevel[this.envLogLevel] ?? logLevel;
  }

  private async log(level: LogLevel, ...messages: unknown[]): Promise<void> {
    if (level >= this.logLevel || messages.length === 0) {
      const date = new Date();
      let logMessage = `[${convertDateToTimestamp(date)}] [${
        LogLevel[level]
      }]`.padEnd(35);

      switch (level) {
        case LogLevel.DEBUG:
          logMessage = `\x1b[90m${logMessage}`; // Gray color
          break;
        case LogLevel.INFO:
          logMessage = `\x1b[00m${logMessage}`; // White color
          break;
        case LogLevel.WARNING:
          logMessage = `\x1b[33m${logMessage}`; // Yellow color
          break;
        case LogLevel.ERROR:
          logMessage = `\x1b[31m${logMessage}`; // Red color
          break;
        default:
          break;
      }

      console.log(`${logMessage}\x1b[0m`, ...messages); // Reset color
    }
  }

  debug(...messages: unknown[]): void {
    this.log(LogLevel.DEBUG, ...messages);
  }

  info(...messages: unknown[]): void {
    this.log(LogLevel.INFO, ...messages);
  }

  warning(...messages: unknown[]): void {
    this.log(LogLevel.WARNING, ...messages);
  }

  error(...messages: unknown[]): void {
    this.log(LogLevel.ERROR, ...messages);
  }
}

export default Logger;
