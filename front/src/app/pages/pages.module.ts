import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbSecurityModule } from '@nebular/security';
import {
  NbAlertModule,
  NbButtonModule, NbCardModule,
  NbCheckboxModule, NbIconModule,
  NbInputModule,
  NbMenuModule, NbRadioModule, NbSelectModule,
  NbTreeGridModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CustomersComponent } from './customers/customers.component';
import { UsersComponent } from './users/users.component';
import { QuotationComponent } from './quotation/quotation.component';
import { ModulesComponent } from './modules/modules.component';
import { ComposantsComponent } from './composants/composants.component';
import { ProfilComponent } from './profil/profil.component';
import { StockComponent } from './stock/stock.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { LoginComponent } from './auth/login/login.component';
import { RequestPasswordComponent } from './auth/request-password/request-password.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ButtonTableComponent } from './smart-table/button-table/button-table.component';
import { UserModalAddComponent } from './users/user-modal-add/user-modal-add.component';
import { CustomersModalAddComponent } from './customers/customers-modal-add/customers-modal-add.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NbSecurityModule,
    NbInputModule,
    FormsModule,
    NbCheckboxModule,
    NbAlertModule,
    NbButtonModule,
    NbTreeGridModule,
    NbCardModule,
    NbIconModule,
    NbSelectModule,
    NbRadioModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PagesComponent,
    CustomersComponent,
    UsersComponent,
    QuotationComponent,
    ModulesComponent,
    ComposantsComponent,
    ProfilComponent,
    StockComponent,
    SmartTableComponent,
    LoginComponent,
    RequestPasswordComponent,
    LogoutComponent,
    SmartTableComponent,
    ButtonTableComponent,
    UserModalAddComponent,
    CustomersModalAddComponent,
  ],
})
export class PagesModule {
}
