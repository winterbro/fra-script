import Bybit from "./services/bybit";
import Logger from "./utils/logger";
import { LogLevel } from "./types/logger";

const logger = new Logger(LogLevel.INFO);

async function main() {
  logger.info("---------------------------");
  logger.info("Initializing application...");
  logger.info("---------------------------");

  const bybit = new Bybit();

  const serverTime = await bybit.getServerTime();
  const btcusdt = await bybit.getTicker("BTCUSDT");
  const btcPrice = await bybit.getLastPrice("BTCUSDT");

  logger.info("Server time:", new Date(+serverTime * 1000));
  logger.info("BTCUSDT Ticker:", btcusdt);
  logger.info("btcPrice:", btcPrice);
}

main();
