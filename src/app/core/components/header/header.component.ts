import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public redirectUrl = false;
  public isLoggedIn: boolean = false;
  constructor(public router: Router, private appState: AppState) {
    if (this.appState.applicationIdentifier) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    
  }

  setLanguage() {
  }
  
  logoutUser() {
    this.router.navigateByUrl('/login');
  }
}
