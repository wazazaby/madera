import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

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

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
  ],
  declarations: [
    PagesComponent,
    CustomersComponent,
    UsersComponent,
    QuotationComponent,
    ModulesComponent,
    ComposantsComponent,
  ],
})
export class PagesModule {
}
