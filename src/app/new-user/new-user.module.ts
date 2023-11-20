import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { DisclosuresComponent } from './disclosures/disclosures.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserRoutingModule } from './new-user-routing.module';
import { TermsComponent } from './terms/terms.component';
import { ThankyouComponent } from './thankyou/thankyou.component';


@NgModule({
  declarations: [
    DisclosuresComponent,
    BasicDetailsComponent,
    TermsComponent,
    ThankyouComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    NewUserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewUserModule { }
