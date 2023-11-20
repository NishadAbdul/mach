import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '../layout/default/default.component';
import { DEFAULT_ROUTES } from './default-routing.module';
import { NotFoundComponent } from "../layout/not-found/not-found.component";
import { WelcomeComponent } from '../welcome/welcome.component';
import { DashboardComponent } from '../layout/dashboard/dashboard.component';
import { DASHBOARD_ROUTES } from './dashboard-routing.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'welcome', pathMatch: 'full'
  },
  {
    path: 'home', component: DefaultComponent, children: DEFAULT_ROUTES
  }, 
  {
    path: 'dashboard', component: DashboardComponent, children: DASHBOARD_ROUTES
  },  
  {
    path: 'welcome', component: WelcomeComponent   
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '404'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
