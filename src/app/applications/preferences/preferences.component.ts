import { Component } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { PreferencesService } from './services/preferences.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {
  preferenceName: string = '';
  preferenceGroupList: any = []

  constructor(private prefernceServices: PreferencesService,
    private router: Router,
    public dialog: MatDialog,) {
    
  }

  ngOnInit() {
    this.getAllPrefrences();
  }

  getAllPrefrences() {
    this.prefernceServices.getPreferences().subscribe((data: any) => {
      this.preferenceGroupList = data;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.preferenceGroupList, event.previousIndex, event.currentIndex);
  }

  savePreferences() {
    const message = `I reviewed my program preferences and confirm to update my application.?`;
    const dialogData = new ConfirmDialogModel("Please Confirm", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.updatedPreferencePost();
      }
    });
  }

  updatedPreferencePost() {
    this.prefernceServices.savePreferences(this.preferenceGroupList).subscribe(data => {
      this.router.navigateByUrl('/dashboard/applications/additional-details');
    });
  }
}
