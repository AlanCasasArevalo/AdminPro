import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuardGuard,
  UploadFileService,
  HospitalService,
  DoctorService,
} from './service.index';

import {  HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers : [
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    DoctorService,
    HospitalService,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
