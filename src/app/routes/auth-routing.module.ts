import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../welcome/welcome.component').then(m => m.WelcomeComponent)
    }
]