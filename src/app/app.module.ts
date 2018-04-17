import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Temp
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routes
import { APP_ROUTES } from './app.routes';

// Our modules
import { PagesModule } from './pages/pages.module';

// Our components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';

// Services
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';

// Libraries
// Material
import { MatNativeDateModule, MatInputModule, MatFormFieldModule, MatDatepickerModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,

    BrowserAnimationsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
        // Material
        MatNativeDateModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
