import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Investor } from 'src/app/Models/Investor';
import LiquidityPool from 'src/app/Models/LiquidityPool';
import ConnectionsServices from '../connectionConstants';

@Injectable({
  providedIn: 'root',
})
export class PoolsService {
  constructor(private httpClient: HttpClient) {}

  getLiquidityPools(): Observable<LiquidityPool[]> {
    return this.httpClient.get<LiquidityPool[]>(
      ConnectionsServices.poolConnection,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  updateInvestorsWallet(
    lp_name: string,
    pool_address: string,
    lp_amount: number,
    investor: Investor
  ): Observable<Investor> {
    investor.usd = 0;
    investor.lp_amount = lp_amount;
    investor.lp_name = lp_name;
    investor.pool_address = pool_address;
    return this.httpClient.put<Investor>(
      ConnectionsServices.currentConnection +
        `/investors/update/${investor.id}`,
      investor,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getInvestors(): Observable<Investor[]> {
    return this.httpClient.get<Investor[]>(
      ConnectionsServices.currentConnection + '/investors',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
