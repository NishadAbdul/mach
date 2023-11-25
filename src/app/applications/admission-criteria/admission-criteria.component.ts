import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admission-criteria',
  templateUrl: './admission-criteria.component.html',
  styleUrl: './admission-criteria.component.scss'
})
export class AdmissionCriteriaComponent {
  admissionCriteriaForm!: FormGroup;
  public displayedColumns: string[] = ['exam', 'scoringMethodology', 'score', 'weightage', 'date', 'action'];
  public dataSource: any = [
    { exam: 'GAT-General Aptitude Test', scoringMethodology: 'Percenatge', score: 0, weightage: 0.00, date: ''},
    { exam: 'Academic Achievement Test', scoringMethodology: 'Percenatge', score: 0, weightage: 0.00, date: ''},
  ];
}
