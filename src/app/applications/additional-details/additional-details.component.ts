import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss']
})
export class AdditionalDetailsComponent {
  additionalDetailsForm!: FormGroup;
  constructor() {
    this.additionalDetailsForm = new FormGroup({
      name: new FormControl('')
    })
  }
}
