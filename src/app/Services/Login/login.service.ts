import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConnectionsServices } from '../connectionConstants';
import { Investor } from 'src/app/Models/Investor';
import CreateInvestor from 'src/app/Models/CreateInvestor';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets the information of a register user
   * @param email the email of the user subscribed to the service
   * @returns a investor array data transfer object (dto)
   * Observable<Investor[]>
   */
  getInvestorDetails(userEmail: string): Observable<Investor[]> {
    return this.httpClient.get<Investor[]>(
      ConnectionsServices.currentConnection + `/investors/${userEmail}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  registerInvestorEmail(userEmail: string): Observable<Investor> {
    const createInvestor: CreateInvestor = { user_email: userEmail };

    return this.httpClient.post<Investor>(
      ConnectionsServices.currentConnection + `/investors/create`,
      createInvestor,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  storeLoggedInvestor(investor: Investor) {
    localStorage.setItem('user_info', JSON.stringify(investor));
  }

  getLoggedInvestor(): Investor {
    let temp: any = {};
    if (localStorage.getItem('user_info') != null)
      temp = localStorage.getItem('user_info');
    return JSON.parse(temp);
  }
}
