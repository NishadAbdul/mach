import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from './services/address.service';
import { AppState } from 'src/app/app.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent {
  public addressDetailsForm !: FormGroup;
  sameAsPermanent: boolean = true;
  masterData: any;
  constructor(private router: Router,
    private addressService: AddressService,
    private appState: AppState) {
    this.formBuilder();
  }

  ngOnInit() {
    this.getAddressDetails();
  }

  getAddressDetails() {
    this.addressService.getAddressDetails().subscribe((data: any) => {
      this.setAddressDetails(data?.applicantAddresses);
    })
    this.addressService.getMasterData().subscribe((data: any) => {
      this.masterData = data;
    }) 
  }

  setAddressDetails(data: any) {
    if (data?.length > 0) {
      if (data?.length > 1) {
        const address = this.addressDetailsForm.get('addressDetails') as FormArray;
        address.push(this.createAddressFormGroup(1));  
      }
      data.forEach((add: any, index: number) => {
        this.setAddressFieldValues(add, index);
      })
    }
    
  }

  setAddressFieldValues(data: any, index: number) {
    this.addressGroup.at(index).patchValue({
      addressId: data?.addressId,
      address: data?.address,
      pobox: data?.pobox,
      countryId: data?.countryId,
      cityName: data?.cityName,
      provinceName: data?.provinceName,
      postalCode: data?.postalCode,
      homeTelephoneNumber:  data?.homeTelephoneNumber
    })
    if (index === 1) {
      this.sameAsPermanent = false;
    }
  }

  formBuilder() {
    this.addressDetailsForm = new FormGroup({
      addressDetails: new FormArray([this.createAddressFormGroup()]),
    })
  }

  private createAddressFormGroup(index: number = 0): FormGroup {
    return  new FormGroup({
      addressId: new FormControl<number>(index),
      address: new FormControl<string | null>("addressline1"),
      pobox: new FormControl<string | null>(""),
      countryId: new FormControl<number | null>(0),
      cityName: new FormControl<string | null>(""),
      provinceName: new FormControl<string | null>(""),
      postalCode: new FormControl<string | null>(""),
      homeTelephoneNumber:  new FormControl<string | null>("")
    })
  }

  handleAddressForm(checked: boolean) {
    if (!checked) {
      this.addAddressForm();
    } else {
      this.removeAddress();
    }
  }

  addAddressForm() {   
    const address = this.addressDetailsForm.get('addressDetails') as FormArray;
    if (address.controls.length === 1) {
      address.push(this.createAddressFormGroup(1));
    }  
  }

  public removeAddress(i: number = 1) {
    const address = this.addressDetailsForm.get('addressDetails') as FormArray
    if (address.controls.length > 1) {
      address.removeAt(i);
    }
  }

  saveAddressDetails() {
    if(this.addressDetailsForm.valid) {
      this.addressService.saveAddressDetails(this.addressDetailsForm.value).subscribe((response:any) => {
        this.router.navigateByUrl('/dashboard/applications/educational-details');
      }, error => {
        this.router.navigateByUrl('/dashboard/applications/educational-details');
      })
    }
  }

  get addressGroup() {
    return this.addressDetailsForm.controls['addressDetails'] as FormArray
  }

}
