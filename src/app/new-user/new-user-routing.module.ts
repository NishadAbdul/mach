import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisclosuresComponent } from './disclosures/disclosures.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { TermsComponent } from './terms/terms.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
const routes: Routes = [
  { path: '', redirectTo: 'guidlines', pathMatch: 'full'},
  { path: 'guidlines', component: DisclosuresComponent, data: { ApplicationProgress : 1}},
  { path: 'basic-details', component: BasicDetailsComponent, data: { ApplicationProgress : 2}},
  { path: 'terms', component: TermsComponent, data: { ApplicationProgress : 3}},
  { path: 'thankyou', component: ThankyouComponent, data: { ApplicationProgress : 4}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewUserRoutingModule { }