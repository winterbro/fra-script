import { InternalAxiosRequestConfig } from "axios";

export interface AxiosRequestConfigWithMetadata
  extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: Date;
  };
}
