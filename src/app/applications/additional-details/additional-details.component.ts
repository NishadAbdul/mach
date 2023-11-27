import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AdditionalDetailsService } from './services/additional-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss']
})
export class AdditionalDetailsComponent {
  additionalDetailsForm!: FormGroup;
  additionalDetails: any = [];
  constructor(private additionalDetailsService: AdditionalDetailsService,
    private router: Router) {
    this.additionalDetailsForm = new FormGroup({
      questionArray: new FormArray([])
    })
  }

  ngOnInit() {
    this.getAdditionalDetails();
  }

  getAdditionalDetails() {
    this.additionalDetailsService.getAdditionalDetails().subscribe((data: any) => {
      this.additionalDetails = data;
      this.setQuestionDetails();
    })
  }

  setQuestionDetails() {
    if (this.additionalDetails?.length > 0) {
      this.additionalDetails?.forEach((qn: any, index: number) => {
        const qns = this.additionalDetailsForm.controls['questionArray'] as FormArray;
        qns.push(this.createQnsFormGroup(qn, index));
      })
    }
    
  }

  private createQnsFormGroup(qn: any, index: number = 0): FormGroup {
    return  new FormGroup({
      questionsByTermRecId: new FormControl<number>(qn?.questionsByTermRecId),
      questionsDetailsRecId: new FormControl<number>(qn?.questionsByTermRecId),
      questionEngName: new FormControl<string>(qn?.questionEngName),
      questionLocalName:  new FormControl<string>(qn?.questionLocalName)
    })
  }

  setAnswer(qns: any, value: boolean) {
    qns?.get('questionsDetailsRecId')?.setValue(value);
  }

  get questionGroup() {
    return this.additionalDetailsForm.controls['questionArray'] as FormArray;
  }

  saveAdditionalDetails() {
    this.additionalDetailsService.saveAdditionalDetails(this.additionalDetailsForm.value.questionArray).subscribe((data: any) => {
      this.router.navigateByUrl('/dashboard/applications/review');
    })
  }
}
