import { CommonModule, NgOptimizedImage, Location } from '@angular/common';
import { Component, SecurityContext, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { checkEmailAddressPattern } from '../core/utilities/utils';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { AppState } from '../app.service';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../core/core.module';

@Component({
  selector: 'app-home',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,  
    SharedModule,
    ReactiveFormsModule,
    NgOptimizedImage    ,
    NgxMaskDirective,
    NgxMaskPipe,
    CoreModule,
    TranslateModule
  ],
})
export class WelcomeComponent {
  public loginForm!: FormGroup;
  public forgotPasswordForm!: FormGroup;
  confirmationSuccess: boolean = false;
  dialogRef!: MatDialogRef<any>;
  @ViewChild('loginModal') loginModal!: TemplateRef<any>;
  @ViewChild('registerModal') registerModal!: TemplateRef<any>;

  constructor(private dialog: MatDialog, 
    private readonly fb: NonNullableFormBuilder,
    private router: Router,
    private userService: UserService,
    public sanitizer: DomSanitizer,
    private appState: AppState) {
      if(this.appState.applicationIdentifier) {
        this.appState.deleteSharedObj('applicationIdentifier');
      }
    this.loginForm = this.fb.group({
      username: new FormControl<string>("", Validators.required),
      password: new FormControl<string>("", Validators.required)
    });

    this.forgotPasswordForm = this.fb.group({
      emailAddress: new FormControl<string>('', [Validators.required, checkEmailAddressPattern])
    });
  }

  openModal(dialogCnt: any) {
    this.dialogRef = this.dialog.open(dialogCnt, {
      disableClose: true, 
      panelClass: 'home-modal',
      width: '580px',
      autoFocus: false
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.confirmationSuccess = false;
      this.loginForm.reset();
      this.forgotPasswordForm.reset();
    });
  }

  openRegister() {
    this.dialogRef = this.dialog.open(this.registerModal, {disableClose: true, panelClass: 'home-modal', width: '580px', autoFocus: false })
  }

  closeModals() {
    this.dialogRef.close();
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe((data: any) => {
        this.appState.setSharedObj('applicationIdentifier', data.applicationIdentifier)
        this.redirectToDashboard(data.applicationIdentifier);
        this.closeModals();
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  redirectToDashboard(key: string) {
    this.router.navigateByUrl('dashboard/applications/welcome')
  }

  forgotPassword() {
    if(this.forgotPasswordForm.valid) {
      this.userService.forgotPassword(this.forgotPasswordForm.value.emailAddress).subscribe((data: any) => {
        this.confirmationSuccess = true;
      })
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
