import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkEmailAddressPattern } from '../../core/utilities/utils';
import { Router } from '@angular/router';
import { NewUserService } from './services/new-user.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss']
})
export class BasicDetailsComponent implements OnInit{
  public basicDetailsForm !: FormGroup;
  constructor(private router: Router,
    private newUserService: NewUserService) {}

  ngOnInit() {
    this.formBuilder();
  }

  formBuilder() {
    this.basicDetailsForm = new FormGroup({
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
      mobile: new FormControl<string>('', Validators.required),
      emailAddress: new FormControl<string>('', [Validators.required, checkEmailAddressPattern]),
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
  }

  saveUserDetails() {
    if(this.basicDetailsForm.valid) {
      console.log(this.basicDetailsForm.value);
      this.newUserService.saveUserDetails(this.basicDetailsForm.value).subscribe((data:any)=> {
        console.log("suuccessfully created");
        this.router.navigateByUrl('/home/new-user/terms');
      });      
    } else {
      this.basicDetailsForm.markAllAsTouched();
    }
  }

}
