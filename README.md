# Funding Rate Arbitrage script

The purpose of this program is to take advantage of high funding rates and the potential price movement that may follow funding settlements.

> **Disclaimer:** Use at own risk!

## Setup
Create a .env file in the root directory with the following setup:
```bash
BYBIT_BASE_URL=             # https://api.bybit.com
BYBIT_TESTNET_BASE_URL=     # https://api-testnet.bybit.com
BYBIT_TESTNET=              # boolean
BYBIT_API_KEY=              # string
BYBIT_API_SECRET=           # string

LOG_LEVEL=DEBUG # DEBUG | INFO | WARNING | ERROR | false (if unset)
```
```bash
npm install
```

## Development environment
```bash
npm install
npm run start:dev
```

## Building
```bash
npm run build
```

## Linting
```bash
npm run lint
```