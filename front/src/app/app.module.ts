import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthguardService } from './services/authguard.service';
import { StatesService } from './services/states.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbSecurityModule.forRoot({
      accessControl: {
        user: {
          view: '',
        },
        admin: {
          parent: 'user',
          view: ['admin'],
        },
        commercial: {
          parent: 'user',
          view: ['commercial'],
        },
        stockist: {
          parent: 'user',
          view: ['stockist'],
        },
      },
    }),
    // TODO fonctionnera quand l'API sera dispo -> /login
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://127.0.0.1:3306/',
          login: {
            endpoint: 'user/login',
            method: 'POST',
            defaultErrors: ['Compte incorrect, merci de contacter votre administrateur'],
            defaultMessages: ['Bienvenue Madara Uchiha'],
            redirect: {
              success: '/dashboard/',
              failure: null, // stay on the same page
            },
          },

          logout: {
            method: 'POST',
            endpoint: 'user/logout',
            redirect: {
              success: '/auth/login',
              failure: null, // stay on the same page
            },
          },

          requestPass: {
            redirect: {
              success: '/auth/login',
              failure: null, // stay on the same page
            },
          },
        }),
      ],
      forms: {},
    }),
  ],
  providers: [
    AuthguardService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: NbRoleProvider, useClass: StatesService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
