import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import Logger from "../utils/logger";
import { convertDateToTimestamp } from "../utils/date";
import { LogLevel } from "../types/logger";
import { AxiosRequestConfigWithMetadata } from "../types/axios";

class Client {
  private logger: Logger;
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.logger = new Logger(LogLevel.INFO);

    this.instance = axios.create({ baseURL });

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfigWithMetadata) => {
        const mutableConfig = config;
        mutableConfig.metadata = { startTime: new Date() };
        return mutableConfig;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const mutableConfig = response.config as AxiosRequestConfigWithMetadata;
        const endTime = new Date();
        const startTime = mutableConfig.metadata?.startTime;

        if (!startTime) {
          throw new Error("Request start time not found");
        }

        this.logger.debug(
          `Request to ${response.config.url} took ${
            endTime.getTime() - startTime.getTime()
          } ms.`,
        );
        this.logger.debug(
          `Request to ${
            response.config.url
          } was sent at ${convertDateToTimestamp(startTime)}`,
        );
        this.logger.debug(
          `Response from ${
            response.config.url
          } was received at ${convertDateToTimestamp(endTime)}`,
        );

        return response;
      },
      (error) => Promise.reject(error),
    );
  }

  private handleResponse<T>(response: AxiosResponse<T>): Promise<T> {
    this.logger.debug("Handling response:", response.data);
    return Promise.resolve(response.data);
  }

  private handleResponseError(error: AxiosError): Promise<never> {
    if (error.response) {
      this.logger.error(error.message);
      this.logger.debug("Request failed with response:", error.response);
      return Promise.reject(error.response.data);
    }
    if (error.request) {
      this.logger.error("No response received:", error);
    } else {
      this.logger.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error);
  }

  public setHeaders(headers: Record<string, string>): void {
    this.logger.debug("Setting headers:", headers);
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      ...headers,
    };
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.get<T>(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return this.handleResponseError(error);
      }
      throw error;
    }
  }

  public async post<T, U>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
  ): Promise<U> {
    try {
      const response = await this.instance.post<T, AxiosResponse<U>>(
        url,
        data,
        config,
      );
      return await this.handleResponse(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return this.handleResponseError(error);
      }
      throw error;
    }
  }
}

export default Client;
