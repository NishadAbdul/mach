import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WelcomeService } from './services/welcome.service';
import { AppState } from 'src/app/app.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  dialogRef!: MatDialogRef<any>;
  public createApplicationForm!: FormGroup;
  public courses: any;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private readonly fb: NonNullableFormBuilder,
    private createAppService: WelcomeService,
    private appState: AppState) {
      if (!this.appState.getSharedObj('applicationIdentifier')) {
        if (this.route.snapshot.paramMap.get('applicationIdentifier')) {
          const applicationIdentifier = this.route.snapshot.paramMap.get('applicationIdentifier');
          this.appState.setSharedObj('applicationIdentifier', applicationIdentifier);
        }        
      } else {
        window.location.href = 'https://google.com';
      }
      this.formBuilder();
    }

    ngOnInit() {
      this.createAppService.getCourseMasterData().subscribe((data: any) => {
        this.courses = data;
      })
    }

    openModal(dialogCnt: any) {
      this.dialogRef = this.dialog.open(dialogCnt, {
        disableClose: true, 
        panelClass: 'home-modal',
        width: '580px',
        autoFocus: false
      });
      this.dialogRef.afterClosed().subscribe((result: any) => {
        this.createApplicationForm.reset();
      });
    }

    closeModals() {
      this.createApplicationForm.reset();
      this.dialog.closeAll();    
    }

    formBuilder() {
      this.createApplicationForm = this.fb.group({
        userId: new FormControl<number>(0),
        admissionTypeRecId: new FormControl<number>(0),
        degreeTypeRecId: new FormControl<number>(0),
        academicYearRecId: new FormControl<number>(0),
        termId: new FormControl<number>(0)
      });
    }

    startApplication() {
      this.createAppService.startApplication(this.createApplicationForm.value).subscribe((response: any) => {
        this.appState.setSharedObj('applicationNumber', response.applicationNumber);
        this.appState.setSharedObj('applicationRecId', response.applicationRecId);
        this.closeModals();
        this.router.navigateByUrl('/home/applications/instructions')
      })
      this.router.navigateByUrl('/home/applications/instructions')
    }
}
