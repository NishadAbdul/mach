import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllApplicationsComponent } from './all-applications/all-applications.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { EducationalDetailsComponent } from './educational-details/educational-details.component';
import { DocumentsComponent } from './documents/documents.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AdditionalDetailsComponent } from './additional-details/additional-details.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'all-applications', component: AllApplicationsComponent},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'welcome/:applicationIdentifier', component: WelcomeComponent},
  { path: 'instructions', component: InstructionsComponent, data: { ApplicationProgress : 1}},
  { path: 'personal-details', component: PersonalDetailsComponent, data: { ApplicationProgress : 2}},
  { path: 'address-details', component: AddressDetailsComponent, data: { ApplicationProgress : 3}},
  { path: 'educational-details', component: EducationalDetailsComponent, data: { ApplicationProgress : 4}},
  { path: 'documents', component: DocumentsComponent, data: { ApplicationProgress : 5}},
  { path: 'program-prefrences', component: PreferencesComponent, data: { ApplicationProgress : 6}},
  { path: 'additional-details', component: AdditionalDetailsComponent, data: { ApplicationProgress : 7}},
  { path: 'review', component: ReviewComponent, data: { ApplicationProgress : 87}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }