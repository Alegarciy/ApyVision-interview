export class ConnectionsServices {
  public static currentConnection: string = 'http://localhost:3000';
  public static poolConnection: string =
    '/api/v1/pool_search/advanced_search?avg_period_daily_volume_usd=5000000&avg_period_reserve_usd=250000&min_pool_age_days=7&vr=0&exchanges=uniswap_eth&access_token=b55b52c3-3d81-47c5-8d47-91925ce6a6a9';
}

export default ConnectionsServices;
