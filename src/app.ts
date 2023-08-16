import loadEnvVariable from "./utils/env";
import Logger from "./utils/logger";
import { LogLevel } from "./types/logger";
import Bybit from "./services/bybit";
import { BybitOptions } from "./types/bybit";

const logger = new Logger(LogLevel.INFO);

async function main() {
  logger.info("---------------------------");
  logger.info("Initializing application...");
  logger.info("---------------------------");

  const bybitOptions: BybitOptions = {
    apiKey: loadEnvVariable("BYBIT_API_KEY"),
    apiSecret: loadEnvVariable("BYBIT_API_SECRET"),
    baseUrl: loadEnvVariable("BYBIT_BASE_URL")
  };

  const bybit = new Bybit(bybitOptions);

  const serverTime = await bybit.getServerTime();
  const btcusdt = await bybit.getTicker("BTCUSDT");
  const btcPrice = await bybit.getLastPrice("BTCUSDT");

  logger.info("Server time:", new Date(+serverTime * 1000));
  logger.info("BTCUSDT Ticker:", btcusdt);
  logger.info("btcPrice:", btcPrice);
}

main();
