# Ostium Data TypeScript Reference Implementation

A TypeScript reference implementation for fetching and processing data from Ostium's subgraph. This repository demonstrates how to properly format and normalize data from the Ostium protocol, including proper handling of decimals, BigNumber conversions, and type safety.

## Features

- Proper decimal handling for all numeric values
- Type-safe data structures
- Normalized data formats
- Comprehensive examples of subgraph queries
- BigNumber handling for precise calculations

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

// Example: Get active orders for an address
const orders = await getFormattedOrders('0x...');

// Example: Get recent order history
const history = await getFormattedRecentHistory('0x...', 10);
```

## Implementation Details

### Data Normalization

The implementation handles various precision levels:
- PRECISION_18 (1e18) for prices and rates
- PRECISION_6 (1e6) for fees and amounts
- PRECISION_2 (1e2) for leverage and percentages

### Available Functions

#### Pairs
- `getFormattedPairs()`: Get all trading pairs with normalized data
- `getFormattedPairDetails(pairId)`: Get specific pair details

#### Trades
- `getFormattedOpenTrades(address)`: Get open trades for an address
- `getFormattedTradeById(tradeId)`: Get specific trade details

#### Orders
- `getFormattedOrders(address)`: Get active orders
- `getFormattedOrderById(orderId)`: Get specific order details
- `getFormattedRecentHistory(address, limit)`: Get order history

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