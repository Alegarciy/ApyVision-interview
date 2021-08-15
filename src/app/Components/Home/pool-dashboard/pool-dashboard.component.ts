import { Component, OnInit } from '@angular/core';
import Investor from 'src/app/Models/Investor';
import LiquidityPool from 'src/app/Models/LiquidityPool';
import { LoginService } from 'src/app/Services/Login/login.service';
import { PoolsService } from 'src/app/Services/Pools/pools.service';

@Component({
  selector: 'app-pool-dashboard',
  templateUrl: './pool-dashboard.component.html',
  styleUrls: ['./pool-dashboard.component.css'],
})
export class PoolDashboardComponent implements OnInit {
  public investor: Investor;
  /* User Form Fields */
  public idField: number = 0;
  public user_email: string = '';
  public usd: number = 0;
  public lp_amount: number = 0;
  public lp_name: string = 'No investment in crypto yet...';
  public pool_address: string = 'No investment in pool yet...';
  /* Liquidity Pool Form */
  public liquidityPoolArray: LiquidityPool[] = [];

  constructor(
    private loginService: LoginService,
    private poolsService: PoolsService
  ) {
    this.investor = this.loginService.getLoggedInvestor();
  }

  ngOnInit(): void {
    this.initializeClientInformation();
    this.setLiquidityPools();
  }

  initializeClientInformation() {
    this.idField = this.investor.id;
    this.user_email = this.investor.user_email;
    this.usd = this.investor.usd;
    this.lp_amount = this.investor.lp_amount;
    this.lp_name = this.investor.lp_name;
    this.pool_address = this.investor.pool_address;
  }

  setLiquidityPools() {
    this.poolsService.getLiquidityPools().subscribe(
      (res: LiquidityPool[]) => {
        console.log(res);
        if (res.length > 0) {
          console.log('Loaded the Liquidity Pools 🥰🥰🥰');
          this.liquidityPoolArray = res;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
