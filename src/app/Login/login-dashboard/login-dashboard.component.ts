import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

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

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#5b76ff';
  }

  onLogin() {
    this.showError();
  }

  onRegister() {
    console.log('User registered in');
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  showError() {
    this.alerts = Array.from(ALERTS);
  }
}
