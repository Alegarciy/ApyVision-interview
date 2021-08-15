import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
