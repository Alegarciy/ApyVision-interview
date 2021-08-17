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
  public selectedPool: LiquidityPool;
  public topInvestors: Investor[] = [];
  public liquidityPoolMap: Map<string, LiquidityPool> = new Map();

  constructor(
    private loginService: LoginService,
    private poolsService: PoolsService
  ) {
    this.selectedPool = {
      pool_address: '',
      name: '',
      avg_lp_price: 0,
      baseline_date: '',
    };
    this.investor = this.loginService.getLoggedInvestor();
    this.initializeClientInformation();
    this.setLiquidityPools();
  }

  ngOnInit(): void {}

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
      (res: any) => {
        if (res.results.length > 0) {
          console.log('Loaded the Liquidity Pools 🥰🥰🥰');
          this.liquidityPoolArray = res.results;
          this.selectedPool = this.liquidityPoolArray[0];
          console.log(this.liquidityPoolArray);
          this.liquidityPoolArray.forEach((pool) => {
            this.liquidityPoolMap.set(pool.pool_address, pool);
          });
          this.loadTopInvestors();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  confirmTransaction(lp_amount: number) {
    this.poolsService
      .updateInvestorsWallet(
        this.selectedPool.name,
        this.selectedPool.pool_address,
        lp_amount,
        this.investor
      )
      .subscribe(
        (res: any) => {
          console.log('Committed the transaction 💸💸💸');
          console.log(this.investor);
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  loadTopInvestors() {
    this.poolsService.getInvestors().subscribe(
      (res: Investor[]) => {
        this.topInvestors = res.filter((investor) => investor.usd == 0);

        console.log('Before sorting');
        console.log(this.topInvestors);
        this.topInvestors = this.sortByIncome(this.topInvestors);
        console.log('After sorting');
        console.log(this.topInvestors);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  //helper function sorting investor by their lp token => usd
  sortByIncome(investorsArray: Investor[]): Investor[] {
    let sortedArray: Investor[] = investorsArray.sort(
      (investorA: Investor, investorB: Investor) => {
        let poolConversionA: any = this.liquidityPoolMap.get(
          investorA.pool_address
        )?.avg_lp_price;
        let poolConversionB: any = this.liquidityPoolMap.get(
          investorB.pool_address
        )?.avg_lp_price;
        if (
          investorA.lp_amount / poolConversionA <
          investorB.lp_amount / poolConversionB
        ) {
          return 1;
        } else {
          console.log(investorA.lp_amount / poolConversionA);
          console.log(investorB.lp_amount / poolConversionB);
          return 0;
        }
      }
    );
    return sortedArray;
  }
}
