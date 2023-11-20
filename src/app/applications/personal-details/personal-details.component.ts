import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalDetailsService } from './services/personal-details.service';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/app.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent {
  public basicDetailsForm !: FormGroup;
  appIdentifier: string = '';
  constructor(private router: Router,
    private newUserService: PersonalDetailsService,
    private appState: AppState) {
      this.appIdentifier = this.appState.getSharedObj('applicationNumber');      
    }

  ngOnInit() {
    this.formBuilder();
    const request = `ApplicationNumber=${this.appIdentifier}&ApplicationRecId=${this.appState.getSharedObj('applicationRecId')}`
    this.newUserService.getPersonalDetails(request).subscribe((data: any) => {
      this.setPersonalDetails(data);
    })    
  }

  setPersonalDetails(data: any) {
    this.basicDetailsForm.patchValue({
      applicationNumber: data?.applicationNumber ? data?.applicationNumber : this.appIdentifier,
      isArabCountry: data?.isArabCountry,
      nationality: data?.nationality,
      nationalId: data?.nationalId,
      firstNameEng: data?.firstNameEng,
      lastNameEng: data?.lastNameEng,
      fatherNameEng: data?.fatherNameEng,
      grandFatherNameEng: data?.grandFatherNameEng,
      dateofBirth: data?.dateofBirth,
      gender: data?.gender,
      firstNameLocal: data?.firstNameLocal,
      lastNameLocal: data?.lastNameLocal,
      fatherNameLocal: data?.fatherNameLocal,
      grandFatherNameLocal: data?.grandFatherNameLocal,
      isdCode: data?.isdCode,
      primaryMobileNo: data?.primaryMobileNo,
      primaryEmailId: data?.primaryEmailId,
    })
  }

  formBuilder() {
    this.basicDetailsForm = new FormGroup({
      applicationNumber: new FormControl<string>(this.appIdentifier),
      isArabCountry: new FormControl<boolean>(true, Validators.required),
      nationality: new FormControl<string>(''),
      nationalId: new FormControl<string>('', Validators.required),
      firstNameEng: new FormControl<string>('', Validators.required),
      lastNameEng: new FormControl<string>('', Validators.required),
      fatherNameEng: new FormControl<string>('', Validators.required),
      grandFatherNameEng: new FormControl<string>('', Validators.required),
      dateofBirth: new FormControl<string>('', Validators.required),
      gender: new FormControl<boolean>(true, Validators.required),
      firstNameLocal: new FormControl<string>('', [Validators.required, Validators.pattern('[\u0600-\u06FF]*')]),
      lastNameLocal: new FormControl<string>('', [Validators.required, Validators.pattern('[\u0600-\u06FF]*')]),
      fatherNameLocal: new FormControl<string>('', [Validators.required, Validators.pattern('[\u0600-\u06FF]*')]),
      grandFatherNameLocal: new FormControl<string>('', [Validators.required, Validators.pattern('[\u0600-\u06FF]*')]),
      isdCode: new FormControl<string>(''),
      primaryMobileNo: new FormControl<string>('', Validators.required),
      primaryEmailId: new FormControl<string>('', [Validators.required]),
    })
  }

  updateNationality(event: any) {
    
    if (!this.basicDetailsForm.controls['isArabCountry'].value) {
      this.basicDetailsForm.controls['firstNameLocal'].clearValidators();
      this.basicDetailsForm.controls['lastNameLocal'].clearValidators();
      this.basicDetailsForm.controls['fatherNameLocal'].clearValidators();
      this.basicDetailsForm.controls['grandFatherNameLocal'].clearValidators();
      this.basicDetailsForm.controls['firstNameLocal'].setValidators(Validators.pattern('[\u0600-\u06FF]*'));
      this.basicDetailsForm.controls['lastNameLocal'].setValidators(Validators.pattern('[\u0600-\u06FF]*'));
      this.basicDetailsForm.controls['fatherNameLocal'].setValidators(Validators.pattern('[\u0600-\u06FF]*'));
      this.basicDetailsForm.controls['grandFatherNameLocal'].setValidators(Validators.pattern('[\u0600-\u06FF]*'));
      this.basicDetailsForm.controls['grandFatherNameEng'].clearValidators();
      this.basicDetailsForm.controls['fatherNameEng'].clearValidators();
      this.basicDetailsForm.controls['nationality'].setValidators(Validators.required);
    } else {
      this.basicDetailsForm.controls['nationality'].clearValidators();
      this.basicDetailsForm.controls['firstNameLocal'].setValidators(Validators.required);
      this.basicDetailsForm.controls['lastNameLocal'].setValidators(Validators.required);
      this.basicDetailsForm.controls['fatherNameLocal'].setValidators(Validators.required);
      this.basicDetailsForm.controls['grandFatherNameLocal'].setValidators(Validators.required);
      this.basicDetailsForm.controls['grandFatherNameEng'].setValidators(Validators.required);
    }
    this.basicDetailsForm.controls['firstNameLocal'].updateValueAndValidity();
      this.basicDetailsForm.controls['lastNameLocal'].updateValueAndValidity();
      this.basicDetailsForm.controls['fatherNameLocal'].updateValueAndValidity();
      this.basicDetailsForm.controls['grandFatherNameLocal'].updateValueAndValidity();
      this.basicDetailsForm.controls['grandFatherNameEng'].updateValueAndValidity();
      this.basicDetailsForm.controls['nationality'].updateValueAndValidity();
      this.basicDetailsForm.controls['fatherNameEng'].updateValueAndValidity();
  }

  saveUserDetails() {    
    if(this.basicDetailsForm.valid) {
      this.newUserService.saveUserDetails(this.basicDetailsForm.value).subscribe((data:any)=> {
        this.router.navigateByUrl('/dashboard/applications/address-details');
      });      
    } else {
      this.basicDetailsForm.markAllAsTouched();
    }
  }
}
