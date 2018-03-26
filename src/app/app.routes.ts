import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { PagedidnotfoundComponent } from './shared/pagedidnotfound/pagedidnotfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const appRoutes: Routes = [
    { path : 'login', component : LoginComponent},
    { path : 'register', component : RegisterComponent},
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path : '**', component: PagedidnotfoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true } );














