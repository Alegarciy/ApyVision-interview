import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoolDashboardComponent } from './Components/Home/pool-dashboard/pool-dashboard.component';
import { LoginDashboardComponent } from './Components/Login/login-dashboard/login-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginDashboardComponent },
  { path: 'poolsDashboard', component: PoolDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
