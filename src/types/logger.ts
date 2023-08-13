export enum LogLevel {
  DEBUG,
  INFO,
  WARNING,
  ERROR,
}

export type ValidLogLevel = keyof typeof LogLevel;
