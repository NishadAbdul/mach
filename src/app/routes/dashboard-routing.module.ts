import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'applications',
        pathMatch: 'full'
    },
    {
        path: 'applications',
        loadChildren: () => import('../applications/applications.module').then(m => m.ApplicationsModule)
    }
]