import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDashboardComponent } from './Login/login-dashboard/login-dashboard.component';

const routes: Routes = [{ path: '', component: LoginDashboardComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
