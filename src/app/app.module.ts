import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
