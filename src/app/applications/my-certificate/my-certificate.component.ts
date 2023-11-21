import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EducationServiceService } from '../educational-details/services/education.service';
import { AddressService } from '../address-details/services/address.service';

@Component({
  selector: 'app-my-certificate',
  templateUrl: './my-certificate.component.html',
  styleUrl: './my-certificate.component.scss'
})
export class MyCertificateComponent {
  public educationalDetailsForm !: FormGroup;
  masterData: any;
  constructor(private router: Router,
    private addressService: AddressService,
    private educationService: EducationServiceService) {}

  ngOnInit() {
    this.formBuilder();
    this.addressService.getMasterData().subscribe((data: any) => {
      this.masterData = data;
    })
  }

  formBuilder() {
    this.educationalDetailsForm = new FormGroup({
      countryId: new FormControl<number>(0),
      provinceName: new FormControl<string>(''),
      cityName: new FormControl<string>('', Validators.required),
      certificateType: new FormControl<string>('', Validators.required),
      schoolName: new FormControl<string>('', Validators.required)
    })
  }

  addCertificates() {
    
  }
}
