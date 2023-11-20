import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-stepper',
  templateUrl: './mobile-stepper.component.html',
  styleUrls: ['./mobile-stepper.component.scss']
})
export class MobileStepperComponent {
  @Input() stepIndex = 0;
  public stepper = { index: this.stepIndex, label: '', next: '', class:''}
  constructor(public router: Router){

  }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if (this.stepIndex === 1) {
      this.stepper = { index: 1, label: 'Guidlines', next: 'Personal Information', class:'progress-25'  }
    } else if (this.stepIndex === 2) {
      this.stepper = { index: 2, label: 'Personal Information', next: 'Terms & Conditions', class:'progress-50' }
    } else if (this.stepIndex === 3) {
      this.stepper = { index: 3, label: 'Terms & Conditions', next: 'Confirmation', class:'progress-75' }
    } else if (this.stepIndex === 4) {
      this.stepper = { index: 4, label: 'Confirmation', next: 'Done', class:'progress-100' }
    }
  }

}
