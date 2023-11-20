import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disclosures',
  templateUrl: './disclosures.component.html',
  styleUrls: ['./disclosures.component.scss']
})
export class DisclosuresComponent {
  public disclosureForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.disclosureForm = this.fb.group({
      'guidelinesAcknowledged': [false, Validators.requiredTrue]
    });
  }

  saveAndProceed() {
    if(this.disclosureForm.get('guidelinesAcknowledged')?.value) {
      this.router.navigateByUrl('/home/new-user/basic-details');
    } else {
      this.disclosureForm.markAllAsTouched();
    }
  }
}
