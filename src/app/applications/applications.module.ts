import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllApplicationsComponent } from './all-applications/all-applications.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { InstructionsComponent } from './instructions/instructions.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { AdditionalDetailsComponent } from './additional-details/additional-details.component';
import { EducationalDetailsComponent } from './educational-details/educational-details.component';
import { DocumentsComponent } from './documents/documents.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { ReviewComponent } from './review/review.component';
import { CdkDropList, CdkDrag} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    AllApplicationsComponent,
    WelcomeComponent,
    InstructionsComponent,
    PersonalDetailsComponent,
    AdditionalDetailsComponent,
    EducationalDetailsComponent,
    DocumentsComponent,
    PreferencesComponent,
    AddressDetailsComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ApplicationsRoutingModule,
    MaterialModule,
    SharedModule,
    CdkDropList, CdkDrag,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApplicationsModule { }
