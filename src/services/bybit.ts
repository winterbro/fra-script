import crypto from "crypto";
import Client from "../lib/axios";
import Logger from "../utils/logger";
import { LogLevel } from "../types/logger";
import {
  BybitOptions,
  ClientResponse,
  ResultList,
  ServerTime,
  TickerData,
  AccountType,
  WalletBalanceItem,
} from "../types/bybit";

class Bybit {
  private logger: Logger;
  private baseUrl: string;
  private key: string;
  private secret: string;
  private timestamp: string;
  private recvWindow: string;
  private client: Client;

  constructor(bybitOptions: BybitOptions) {
    this.logger = new Logger(LogLevel.INFO);
    this.baseUrl = bybitOptions.baseUrl;
    this.key = bybitOptions.apiKey;
    this.secret = bybitOptions.apiSecret;
    this.timestamp = Date.now().toString();
    this.recvWindow = "5000";
    this.client = new Client(this.baseUrl);

    this.client.setHeaders({
      "X-BAPI-API-KEY": this.key,
      "X-BAPI-TIMESTAMP": this.timestamp,
      "X-BAPI-RECV-WINDOW": this.recvWindow,
      "Content-Type": "application/json",
    });
  }

  private getSignature(parameters: string): string {
    return crypto
      .createHmac("sha256", this.secret)
      .update(this.timestamp + this.key + this.recvWindow + parameters)
      .digest("hex");
  }

  public async getAccountBalance(
    accountType: AccountType = AccountType.UNIFIED,
    coin?: string | string[],
  ): Promise<WalletBalanceItem> {
    try {
      if (!accountType) {
        throw new Error(`Account type is required.`);
      }

      this.logger.debug("Requesting account balance...");

      const parameters = `accountType=${accountType}${
        coin ? `&coin=${coin}` : ""
      }`;
      const sign = this.getSignature(parameters);

      this.client.setHeaders({
        "X-BAPI-SIGN": sign,
      });

      const response: ClientResponse<ResultList<WalletBalanceItem>> =
        await this.client.get(`/v5/account/wallet-balance?${parameters}`);

      this.logger.warning("Account balance:", response);

      return response.result.list[0];
    } catch (error) {
      this.logger.error("Error requesting account balance:", error);
      return Promise.reject(error);
    }
  }

  public async getServerTime(): Promise<string> {
    try {
      this.logger.debug("Requesting server time...");
      const response: ClientResponse<ServerTime> = await this.client.get(
        "/v5/market/time",
      );
      return await Promise.resolve(response.result.timeSecond);
    } catch (error) {
      this.logger.error("Error requesting server time:", error);
      return Promise.reject(error);
    }
  }

  public async getTicker(tradingPair: string): Promise<TickerData> {
    try {
      if (!tradingPair) {
        throw new Error(`Trading pair is required.`);
      }

      this.logger.debug(
        `Requesting ticker data for trading pair: ${tradingPair}`,
      );

      const response: ClientResponse<ResultList<TickerData>> =
        await this.client.get(
          `/v5/market/tickers?category=linear&symbol=${tradingPair}`,
        );
      return response.result.list[0];
    } catch (error) {
      this.logger.error("Error requesting ticker:", error);
      throw error;
    }
  }

  public async getLastPrice(tradingPair: string): Promise<string> {
    try {
      if (!tradingPair) {
        throw new Error();
      }

      this.logger.debug(
        `Requesting last price for trading pair: ${tradingPair}`,
      );

      const result = await this.getTicker(tradingPair);
      return result.lastPrice;
    } catch (error) {
      this.logger.error("Error requesting last price:", error);
      throw error;
    }
  }
}

export default Bybit;
