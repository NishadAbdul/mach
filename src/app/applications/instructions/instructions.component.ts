import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructionsService } from './services/instructions.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  public disclosureForm!: FormGroup;
  public instructionList: any = [];
  constructor(private fb: FormBuilder, private router: Router, private instructionService: InstructionsService) {
    this.disclosureForm = this.fb.group({
      'guidelinesAcknowledged': [false, Validators.requiredTrue]
    });
    this.fetchInstructions();
  }

  fetchInstructions() {
    this.instructionService.getInstructions().subscribe((data: any) => {
      this.instructionList = data;
    })
  }

  saveAndProceed() {
    if(this.disclosureForm.get('guidelinesAcknowledged')?.value) {
      this.router.navigateByUrl('/home/applications/personal-details');
    } else {
      this.disclosureForm.markAllAsTouched();
    }
  }
}
