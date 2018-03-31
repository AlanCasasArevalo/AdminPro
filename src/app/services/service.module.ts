import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UserService,
  LoginGuardGuard,
  UploadFileService,
  ServicesService,
  TokenVerifivationGuard,
  ProductsService,
  AppointmentsService,
} from './service.index';

import {  HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { AdminGuard } from './guards/admin.guard';

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
    LoginGuardGuard,
    AdminGuard,
    TokenVerifivationGuard,
    UploadFileService,
    ProductsService,
    ServicesService,
    AppointmentsService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
