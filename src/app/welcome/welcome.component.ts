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
    private loc: Location) {
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
        this.redirectToDashboard(data.applicationIdentifier);
        this.closeModals();
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  redirectToDashboard(key: string) {
    const hostRoute = this.loc.path();
    const url = window.location.href;
    const domainAndApp = url.replace(hostRoute, '');
  //  let url: string | null = this.sanitizer.sanitize(SecurityContext.URL, `${environment.hostUrl}/${key}`);
    const form = window.document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("id", 'redirectForm');
    form.setAttribute("action", `${domainAndApp}/mach-dashboard/${key}`);
    form.setAttribute("target", "_self");
    window.document.body.appendChild(form);
    form.submit();
  //  window.location.href = `${environment.hostUrl}/${key}`
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
