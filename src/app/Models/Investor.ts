export interface Investor {
  id: number;
  user_email: string;
  usd: number;
  lp_amount: number;
  lp_name: string;
  pool_address: string;
}

export default Investor;
