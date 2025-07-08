# Ostium Data TypeScript Reference Implementation

A TypeScript reference implementation for fetching and processing data from Ostium's subgraph. This repository demonstrates how to properly format and normalize data from the Ostium protocol, including proper handling of decimals, BigNumber conversions, and type safety.

## Features

- Proper decimal handling for all numeric values
- Type-safe data structures
- Normalized data formats
- Comprehensive examples of subgraph queries
- BigNumber handling for precise calculations
- Protocol-specific calculations and formulae

## Setup

```bash
# Clone the repository
git clone https://github.com/0xOstium/ostium-data-ts.git

# Install dependencies
cd ostium-data-ts
npm install
```

## Dependencies

- Node.js >= 14
- TypeScript >= 4.5
- ethers.js
- graphql-request

## Example Usage

```typescript
// Subgraph Data Fetching
import { 
  getFormattedPairs,
  getFormattedOpenTrades,
  getFormattedOrders,
  getFormattedRecentHistory
} from './src';

// Example: Fetch and format trading pairs
const pairs = await getFormattedPairs();

// Example: Get open trades for an address
const trades = await getFormattedOpenTrades('0x...');

// Protocol Calculations
import {
  GetCollateralInputFromNotional,
  GetTradeLiquidationPrice,
  CurrentTradeProfitP,
  GetTradeValue,
  GetOpeningFee
} from './src/utils/formulae';

// Example: Calculate liquidation price
const liqPrice = GetTradeLiquidationPrice(
  openPrice,
  isLong,
  collateral,
  leverage,
  rolloverFee,
  fundingFee,
  maxLeverage
);

// Example: Calculate trade profit percentage
const profitP = CurrentTradeProfitP(
  openPrice,
  currentPrice,
  isLong,
  leverage,
  highestLeverage
);
```

## Implementation Details

### Data Normalization

The implementation handles various precision levels:
- PRECISION_18 (1e18) for prices and rates
- PRECISION_6 (1e6) for fees and amounts
- PRECISION_2 (1e2) for leverage and percentages

### Available Functions

#### Data Fetching
- `getFormattedPairs()`: Get all trading pairs with normalized data
- `getFormattedPairDetails(pairId)`: Get specific pair details
- `getFormattedOpenTrades(address)`: Get open trades for an address
- `getFormattedTradeById(tradeId)`: Get specific trade details
- `getFormattedOrders(address)`: Get active orders
- `getFormattedOrderById(orderId)`: Get specific order details
- `getFormattedRecentHistory(address, limit)`: Get order history

#### Protocol Calculations
- `GetCollateralInputFromNotional()`: Calculate required collateral from notional value
- `GetTradeLiquidationPrice()`: Calculate trade liquidation price
- `GetTradeLiquidationMargin()`: Calculate trade liquidation margin
- `CurrentTradeProfitP()`: Calculate current trade profit percentage
- `CurrentTradeProfitRaw()`: Calculate current trade profit in raw value
- `CurrentTotalProfitRaw()`: Calculate total profit including fees
- `GetTradeValue()`: Get current trade value and liquidation margin
- `GetTradeRolloverFee()`: Calculate trade rollover fee
- `GetTradeFundingFee()`: Calculate trade funding fee
- `GetTakeProfitPrice()`: Calculate take profit price
- `GetStopLossPrice()`: Calculate stop loss price
- `GetOpeningFee()`: Calculate trade opening fee
- `GetPriceImpact()`: Calculate price impact for a trade
- `IsDayTradeClosed()`: Check if day trading is closed

## Data Structures

### MappedPair
```typescript
{
  id: number;
  from: string;
  to: string;
  group: string;
  longOI: number;
  shortOI: number;
  maxOI: number;
  makerFeeP: number;
  takerFeeP: number;
  minLeverage: number;
  maxLeverage: number;
  makerMaxLeverage: number;
  groupMaxCollateralP: number;
  minLevPos: number;
  lastFundingRate: number;
  curFundingLong: number;
  curFundingShort: number;
  lastFundingBlock: number;
  overnightMaxLeverage?: number;
}
```

### MappedPosition
```typescript
{
  id: string;
  isOpen: boolean;
  leverage: number;
  notional: number;
  openPrice: number;
  isBuy: boolean;
  index: number;
  highestLeverage: number;
  funding: number;
  collateral: number;
  pairId: string;
  rollover: number;
  stopLossPrice: number | null;
  takeProfitPrice: number | null;
  timestamp: Date | null;
  tradeID: string;
  tradeNotional: number;
  tradeType: string;
  trader: string;
}
```

### MappedOrder
```typescript
{
  id: string;
  trader: string;
  vaultFee: number;
  tradeNotional: number;
  totalProfitPercent: number;
  price: number;
  orderType: string;
  orderAction: string;
  notional: number;
  leverage: number;
  isBuy: boolean;
  collateral: number;
  pairId: string;
}
```

## Development

To run TypeScript files directly:
```bash
npx ts-node src/your-file.ts
```

To build the project:
```bash
npm run build
```

## Contributing

Feel free to use this implementation as a reference for your own projects or contribute improvements via pull requests.

## License

ISC 