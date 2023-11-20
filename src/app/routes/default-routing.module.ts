import { Routes } from '@angular/router';

export const DEFAULT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'new-user',
        pathMatch: 'full'
    },
    {
        path: 'new-user',
        loadChildren: () => import('../new-user/new-user.module').then(m => m.NewUserModule)
    },
]