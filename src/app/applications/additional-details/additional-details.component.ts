import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdditionalDetailsService } from './services/additional-details.service';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss']
})
export class AdditionalDetailsComponent {
  additionalDetailsForm!: FormGroup;
  additionalDetails: any = [];
  constructor(private additionalDetailsService: AdditionalDetailsService) {
    this.additionalDetailsForm = new FormGroup({
      name: new FormControl('')
    })
  }

  ngOnInit() {
    this.getAdditionalDetails();
  }

  getAdditionalDetails() {
    this.additionalDetailsService.getAdditionalDetails().subscribe((data: any) => {
      this.additionalDetails = data;
    })
  }
}
