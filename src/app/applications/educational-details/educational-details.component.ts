import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalDetailsService } from '../personal-details/services/personal-details.service';
import { EducationServiceService } from './services/education.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-educational-details',
  templateUrl: './educational-details.component.html',
  styleUrls: ['./educational-details.component.scss']
})
export class EducationalDetailsComponent {
  public educationalDetailsForm !: FormGroup;
  public displayedColumns: string[] = ['exam', 'scoringMethodology', 'score', 'weightage', 'date', 'year'];
  public dataSource = new MatTableDataSource();
  masterData: any;
  constructor(private router: Router,
    private newUserService: PersonalDetailsService,
    private educationService: EducationServiceService) {}

  ngOnInit() {
    this.formBuilder();
    this.newUserService.getMasterData().subscribe((data: any) => {
      this.masterData = data;
    });
    this.educationService.getEducationDetails().subscribe((response: any) => {
      this.dataSource.data = response;
    })
  }

  formBuilder() {
    this.educationalDetailsForm = new FormGroup({
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
      emailAddress: new FormControl<string>('', [Validators.required]),
    })
  }

  addCertificates() {

  }
}
