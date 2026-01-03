import { 
  getFormattedOpenTrades, 
  getFormattedRecentHistory, 
  getFormattedLimitOrders,
  getFormattedPairs 
} from './src/index';

async function fetchWalletPositions() {
  const walletAddress = '0x0514f2f3e0277c47117e3f33d9390efb0acfbdfe'; // Replace with actual wallet address
  
  console.log('🔍 Fetching data for wallet:', walletAddress);
  console.log('==================================================');
  
  // Check network connectivity first
  console.log('🌐 Checking network connectivity...');
  
  try {
    // Get all available trading pairs
    console.log('\n📊 Available Trading Pairs:');
    const pairs = await getFormattedPairs();
    console.log(`Found ${pairs.length} trading pairs`);
    pairs.slice(0, 3).forEach(pair => {
      console.log(`- ${pair.from}/${pair.to} (ID: ${pair.id})`);
    });
    
    // Get open positions for the wallet
    console.log('\n🔥 Open Positions:');
    const openTrades = await getFormattedOpenTrades(walletAddress);
    if (openTrades.length > 0) {
      console.log(`Found ${openTrades.length} open position(s):`);
      openTrades.forEach((trade, index) => {
        console.log(`${index + 1}. Trade ID: ${trade.tradeID}`);
        console.log(`   - Pair: ${trade.pairId}`);
        console.log(`   - Type: ${trade.isBuy ? 'LONG' : 'SHORT'}`);
        console.log(`   - Leverage: ${trade.leverage}x`);
        console.log(`   - Collateral: ${trade.collateral}`);
        console.log(`   - Open Price: ${trade.openPrice}`);
        console.log(`   - Notional: ${trade.notional}`);
        if (trade.stopLossPrice) console.log(`   - Stop Loss: ${trade.stopLossPrice}`);
        if (trade.takeProfitPrice) console.log(`   - Take Profit: ${trade.takeProfitPrice}`);
        console.log('');
      });
    } else {
      console.log('No open positions found for this wallet.');
    }
    
    // Get active limit orders
    console.log('\n📋 Active Limit Orders:');
    const limitOrders = await getFormattedLimitOrders(walletAddress);
    if (limitOrders.length > 0) {
      console.log(`Found ${limitOrders.length} active limit order(s):`);
      limitOrders.forEach((order, index) => {
        console.log(`${index + 1}. Order ID: ${order.id}`);
        console.log(`   - Pair: ${order.pairId}`);
        console.log(`   - Type: ${order.isBuy ? 'BUY' : 'SELL'}`);
        console.log(`   - Leverage: ${order.leverage}x`);
        console.log(`   - Collateral: ${order.collateral}`);
        console.log(`   - Open Price: ${order.openPrice}`);
        if (order.stopLossPrice) console.log(`   - Stop Loss: ${order.stopLossPrice}`);
        if (order.takeProfitPrice) console.log(`   - Take Profit: ${order.takeProfitPrice}`);
        console.log('');
      });
    } else {
      console.log('No active limit orders found for this wallet.');
    }
    
    // Get recent trading history
    console.log('\n📈 Recent Trading History (Last 5 orders):');
    const recentHistory = await getFormattedRecentHistory(walletAddress, 5);
    if (recentHistory.length > 0) {
      console.log(`Found ${recentHistory.length} recent order(s):`);
      recentHistory.forEach((order, index) => {
        console.log(`${index + 1}. Order ID: ${order.id}`);
        console.log(`   - Pair: ${order.pairId}`);
        console.log(`   - Action: ${order.orderAction}`);
        console.log(`   - Type: ${order.orderType}`);
        console.log(`   - Price: ${order.price}`);
        console.log(`   - Collateral: ${order.collateral}`);
        if (order.totalProfitPercent) {
          console.log(`   - Profit %: ${order.totalProfitPercent}%`);
        }
        console.log('');
      });
    } else {
      console.log('No recent trading history found for this wallet.');
    }
    
  } catch (error: any) {
    console.error('❌ Error fetching wallet data:');
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n🔧 DNS Resolution Failed - Troubleshooting Steps:');
      console.log('1. Check your internet connection');
      console.log('2. Try using a different DNS server (8.8.8.8, 1.1.1.1)');
      console.log('3. Check if you\'re behind a corporate firewall');
      console.log('4. The subgraph endpoint might be temporarily down');
      console.log('\n💡 Alternative solutions:');
      console.log('- Use a VPN if behind restrictive network');
      console.log('- Contact Ostium team for current endpoint status');
      console.log('- Check Ostium Discord/Telegram for announcements');
    } else if (error.message?.includes('timeout')) {
      console.log('\n⏱️ Request timed out - the subgraph might be slow or overloaded');
      console.log('Try again in a few minutes');
    } else {
      console.error('Details:', error.message);
    }
    
    console.log('\n📚 When working, this script will show:');
    console.log('- Available trading pairs');
    console.log('- Open positions with leverage and prices');
    console.log('- Active limit orders');
    console.log('- Recent trading history with P&L');
  }
}

// Run the example
fetchWalletPositions();