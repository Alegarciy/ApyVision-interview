export interface LiquidityPool {
  pool_address: string;
  name: string; // pool_name
  avg_lp_price: number;
  baseline_date: string;
}

export default LiquidityPool;
