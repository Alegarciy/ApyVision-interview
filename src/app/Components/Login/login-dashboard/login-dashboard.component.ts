import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Investor } from 'src/app/Models/Investor';
import UserInformation from 'src/app/Models/UserInformation';
import { LoginService } from 'src/app/Services/Login/login.service';

// This is a basic implementation of alerts using angular powered bootstrap
interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [
  {
    type: 'warning',
    message: 'User could not logged in 😪😪😪',
  },
];

const CONGRATULATIONS: Alert[] = [
  {
    type: 'success',
    message: 'The user was created successfully 🐒🐒🐒',
  },
];

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.css'],
})
export class LoginDashboardComponent implements OnInit {
  log_username: string = '';
  log_password: string = '';
  reg_username: string = '';
  reg_password: string = '';
  reg_membership: string = '';
  alerts: Alert[] = [];

  constructor(
    private elementRef: ElementRef,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#5b76ff';
  }

  onLogin() {
    this.loginService.getInvestorDetails(this.log_username).subscribe(
      (res: Investor[]) => {
        // if the investor is not empty
        if (res.length > 0) {
          console.log('Request send successfully 🥰🥰🥰');
          console.log(res);
          const investorLogged: Investor = res[0];
          this.loginService.storeLoggedInvestor(investorLogged);
          this.router.navigateByUrl('/poolsDashboard');
        } else {
          console.log('User does not exist 😪😪😪');
          console.log(res);
          this.showError();
        }
      },
      (err) => {
        console.log('User could not logged in 😪😪😪');
        console.log(err);
        this.showError();
      }
    );
  }

  onRegister() {
    this.loginService.registerInvestorEmail(this.reg_username).subscribe(
      (res) => {
        if (res != null) {
          console.log('Request send successfully 🥰🥰🥰');
          console.log(res);
          this.showSuccess();
        } else {
          console.log('User does not exist 😪😪😪');
          console.log(res);
        }
      },
      (err) => {
        console.log('User could not logged in 😪😪😪');
        console.log(err);
        this.showError();
      }
    );
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  showError() {
    this.alerts = Array.from(ALERTS);
  }

  showSuccess() {
    this.alerts = Array.from(CONGRATULATIONS);
  }
}
