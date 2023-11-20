import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  sameAsPermanent: boolean = false;
  constructor(private router: Router,
    private addressService: AddressService,
    private appState: AppState) {
    this.formBuilder();
  }

  ngOnInit() {
    
  }

  getAddressDetails() {
    const request = `ApplicationNumber=${this.appState.getSharedObj('applicationNumber')}&ApplicationRecId=${this.appState.getSharedObj('applicationRecId')}`
    this.addressService.getAddressDetails(request).subscribe((data: any) => {
      this.setAddressDetails(data);
    })
  }

  setAddressDetails(data: any) {
    this.addressDetailsForm.patchValue({
      "applicationRecId": data?.applicationRecId,
      "applicationNumber": data?.applicationNumber,
      "contactAddress": data?.contactAddress,
      "contactCityName": data?.contactCityName,
      "contactCountryId": data?.contactCountryId,
      "contactPobox": data?.contactPobox,
      "contactPostalCode": data?.contactPostalCode,
      "contactProvinceName": data?.contactProvinceName,
      "contactHomeTelephoneNumber": data?.contactHomeTelephoneNumber,
      "permanentAddress": data?.permanentAddress,
      "permanentCityName": data?.permanentCityName,
      "permanentCountryId": data?.permanentCountryId,
      "permanentHomeTelephoneNumber": data?.permanentHomeTelephoneNumber,
      "permanentPobox": data?.permanentPobox,
      "permanentPostalCode": data?.permanentPostalCode,
      "permanentProvinceName": data?.permanentProvinceName
    })
  }

  formBuilder() {
    this.addressDetailsForm = new FormGroup({
      applicationRecId: new FormControl<number>(0),
      applicationNumber: new FormControl<boolean>(true),
      contactAddress: new FormControl<string>(''),
      contactCityName: new FormControl<string>(''),
      contactCountryId: new FormControl<number>(0),
      contactPobox: new FormControl<string>(''),
      contactPostalCode: new FormControl<string>(''),
      contactProvinceName: new FormControl<string>(''),
      contactHomeTelephoneNumber: new FormControl<string>(''),
      permanentAddress: new FormControl<string>(''),
      permanentCityName: new FormControl<string>(''),
      permanentCountryId: new FormControl<number>(0),
      permanentHomeTelephoneNumber: new FormControl<string>(''),
      permanentPobox: new FormControl<string>(''),
      permanentPostalCode: new FormControl<string>(''),
      permanentProvinceName: new FormControl<string>('')
    })
  }

  saveAddressDetails() {
    if(this.addressDetailsForm.valid) {
      this.addressService.saveAddressDetails(this.addressDetailsForm.value).subscribe((response:any) => {
        this.router.navigateByUrl('/home/applications/educational-details');
      })
    }
  }

}
