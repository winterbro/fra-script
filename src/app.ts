import { LogLevel, Logger } from "./utils/logger";

const logger = new Logger(LogLevel.DEBUG);

async function main() {
  logger.debug("Initializing application... logged as debug");
  logger.info("Initializing application... logged as info");
  logger.warning("Initializing application... logged as warning");
  logger.error("Initializing application... logged as error");
}

main();
