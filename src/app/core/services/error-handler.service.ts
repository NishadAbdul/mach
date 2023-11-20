import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorHandlerComponent } from '../components/error/error-handler/error-handler.component';

interface ErrorModal {
  isSessionInvalid?: boolean;
  buttonLabel?: string;
  title?: string;
  message?: string;
  icon?: string;
  action?: string;
  traceId?: string | null;
  class?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public isDialogOpen: boolean = false;
  public panelClass: string = 'error-modal';
  constructor(public dialog: MatDialog,
    private router: Router) { }

  openDialog(data:ErrorModal = {}): any {
    if (this.isDialogOpen) {
        return false;
    }
    this.isDialogOpen = true;
    if (data && data.action ==='exit') { data['buttonLabel'] = 'Close'; }
    if (data && data.action ==='agree') { 
      data['buttonLabel'] = 'Accept';
      this.panelClass = 'error-modal'
    }
    const dialogRef = this.dialog.open(ErrorHandlerComponent, {
        data: data, panelClass: this.panelClass, maxWidth: '80vw', width: '320px', disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
        this.isDialogOpen = false;
        if (data.action === 'exit') {
          this.dialog.closeAll();
          this.router.navigateByUrl('/').then(() => location.reload());
        }
    });
}
}
