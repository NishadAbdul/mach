import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard-summary', pathMatch: 'full'},
  { path: 'dashboard-summary', component: DashboardSummaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }