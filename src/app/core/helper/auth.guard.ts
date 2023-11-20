import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from '../../app.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private appState: AppState
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.appState.shared.userSettings;
        if (currentUser) {
            // authorised so return true
            return true;
        } else {
            this.router.navigateByUrl('home');
            return false;
        }
    }
}
