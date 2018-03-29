import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { TokenVerifivationGuard } from '../services/guards/token-verifivation.guard';
import { ProductsComponent } from './products/products.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AppointmentsComponent } from './appointments/appointments.component';

const pagesRoutes: Routes = [

        {
            path : 'dashboard',
            component : DashboardComponent,
            canActivate: [ TokenVerifivationGuard ],
            data: { title: 'Dashboard' }
        },
        { path : 'account-settings', component : AccountSettingsComponent, data: { title: 'Configuracion temas' } },
        { path : 'profile', component : ProfileComponent, data: { title: 'Perfil de usuario' } },
        // Maintenance
        {
            path : 'users',
            component : UsersComponent,
            canActivate: [ AdminGuard ],
            data: { title: 'Mantenimiento de usuarios' }
        },
        { path: 'products', component: ProductsComponent, data : {title: 'Productos'}},
        { path: 'product/:id', component: ProductsComponent, data : {title: 'Producto'}},
        { path: 'blogs', component: BlogsComponent, data : {title: 'Blogs'}},
        { path: 'blog/:id', component: BlogsComponent, data : {title: 'Blog'}},
        { path: 'appointments', component: AppointmentsComponent, data : {title: 'Citas'}},
        { path: 'appointment/:id', component: AppointmentsComponent, data : {title: 'Cita'}},
        { path : '', redirectTo: 'dashboard', pathMatch: 'full'}

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);














