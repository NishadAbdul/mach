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
      cityName: new FormControl<string>(''),
      certificateType: new FormControl<string>(''),
      schoolName: new FormControl<string>(''),
      gradeType:  new FormControl<string>(''),
      externalCode:  new FormControl<string>(''),
      studyCenterName:  new FormControl<string>(''),
      grade: new FormControl<string>('')
    })
  }

  addCertificates() {
    this.educationService.saveCertificates(this.educationalDetailsForm.value).subscribe((data:any)=> {
      this.router.navigateByUrl('/dashboard/applications/educational-details')
    })
  }
}
