import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {
  public termsForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.termsForm = this.fb.group({
      'termsAcknowledged': [false, Validators.requiredTrue]
    });
  }

  confirmSubmit() {
    if(this.termsForm.get('termsAcknowledged')?.value) {
      this.router.navigateByUrl('/home/new-user/thankyou');
    } else {
      this.termsForm.markAllAsTouched();
    }
  }
}
