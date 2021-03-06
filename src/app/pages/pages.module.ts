import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Our Modules
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { PipesModule } from "../pipes/pipes.module";
import { CommonModule } from "@angular/common";

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Our components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { ServicesComponent } from './services/services.component';
import { ServiceComponent } from './service/service.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blog/blog.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

// Material
import { MatNativeDateModule, MatInputModule, MatFormFieldModule, MatDatepickerModule } from '@angular/material';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsersComponent,
    ServicesComponent,
    ServiceComponent,
    ProductsComponent,
    ProductComponent,
    AppointmentsComponent,
    AppointmentComponent,
    BlogsComponent,
    BlogComponent,
    DatepickerComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule,

    // Material
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  exports: [DashboardComponent]
})
export class PagesModule {}
