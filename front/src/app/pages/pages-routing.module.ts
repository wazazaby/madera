import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { QuotationComponent } from './quotation/quotation.component';
import { ModulesComponent } from './modules/modules.component';
import { ComposantsComponent } from './composants/composants.component';
import { ProfilComponent } from './profil/profil.component';
import { StockComponent } from './stock/stock.component';
import { ModulebyidComponent } from './modules/modulebyid/modulebyid.component';

export const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'customers',
      component: CustomersComponent,
    },
    {
      path: 'quotation',
      component: QuotationComponent,
    },
    {
      path: 'modules',
      component: ModulesComponent,
    },
    {
      path: 'modules/:id',
      component: ModulebyidComponent,
    },
    {
      path: 'composant',
      component: ComposantsComponent,
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'profil',
      component: ProfilComponent,
    },
    {
      path: 'stocks',
      component: StockComponent,
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
