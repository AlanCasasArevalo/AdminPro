import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Our Modules
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// Our components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { IncrementerComponent } from '../components/incrementer/incrementer.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DonaGraphicsComponent } from '../components/dona-graphics/dona-graphics.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalComponent } from './hospitals/hospital.component';
import { DoctorComponent } from './doctors/doctor.component';


@NgModule({
  declarations: [
    // PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    IncrementerComponent,
    DonaGraphicsComponent,
    PromiseComponent,
    AccountSettingsComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    DoctorsComponent,
    HospitalComponent,
    // ModalUploadComponent,
    DoctorComponent,
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    CommonModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
  ]
})
export class PagesModule { }
