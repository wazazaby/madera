import { APP_BASE_HREF, CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import {
  NbAccordionModule,
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
import { UtilsService } from './services/utils.service';
import { environment } from '../environments/environment';
import { InterceptorService } from './services/interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NbAccordionModule,
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
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: environment.apiUrlService + '/',
          login: {
            endpoint: 'user/login',
            method: 'post',
            defaultErrors: ['Compte incorrect, merci de contacter votre administrateur'],
            defaultMessages: ['Bienvenue Madara Uchiha'],
            redirect: {
              success: '/dashboard/',
              failure: null, // stay on the same page
            },
          },

          errors: {
            getter: (module, res, options) => {
              return res.error ? res.error.message : options[module].defaultErrors;
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
    { provide: NbRoleProvider, useClass: UtilsService },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
