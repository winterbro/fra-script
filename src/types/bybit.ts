export interface BybitOptions {
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
}

export interface ClientResponse<T> {
  ret_code: number;
  ret_msg: "OK" | string;
  ext_code: string;
  ext_info: string;
  result: T;
  time_now: string;
}

export interface ResultList<T> {
  list: T[];
}

export interface ServerTime<T = object> extends ClientResponse<T> {
  timeSecond: string;
  timeNano: string;
}

export interface TickerData<T = object> extends ClientResponse<ResultList<T>> {
  symbol: string;
  bidPrice: string;
  askPrice: string;
  lastPrice: string;
  lastTickDirection: string;
  prevPrice24h: string;
  price24hPcnt: string;
  highPrice24h: string;
  lowPrice24h: string;
  prevPrice1h: string;
  markPrice: string;
  indexPrice: string;
  openInterest: string;
  turnover24h: string;
  volume24h: string;
  fundingRate: string;
  nextFundingTime: string;
  predictedDeliveryPrice: string;
  basisRate: string;
  deliveryFeeRate: string;
  deliveryTime: string;
  openInterestValue: string;
}

export enum AccountType {
  UNIFIED = "UNIFIED",
  CONTRACT = "CONTRACT",
  SPOT = "SPOT",
}

export interface WalletBalanceItem<T = object>
  extends ClientResponse<ResultList<T>> {
  totalEquity: string;
  accountIMRate: string;
  totalMarginBalance: string;
  totalInitialMargin: string;
  accountType: string;
  totalAvailableBalance: string;
  accountMMRate: string;
  totalPerpUPL: string;
  totalWalletBalance: string;
  accountLTV: string;
  totalMaintenanceMargin: string;
  coin: WalletCoin[];
}

export interface WalletCoin {
  availableToBorrow: string;
  bonus: string;
  accruedInterest: string;
  availableToWithdraw: string;
  totalOrderIM: string;
  equity: string;
  totalPositionMM: string;
  usdValue: string;
  unrealisedPnl: string;
  collateralSwitch: boolean;
  borrowAmount: string;
  totalPositionIM: string;
  walletBalance: string;
  cumRealisedPnl: string;
  locked: string;
  marginCollateral: boolean;
  coin: string;
}
