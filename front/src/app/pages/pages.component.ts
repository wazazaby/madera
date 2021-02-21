import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { MENU_ADMIN, MENU_COMMERCIAL, MENU_STOCK, MENU_USER } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu *nbIsGranted="['view', 'user']" [items]="user"></nb-menu>
      <nb-menu *nbIsGranted="['view', 'admin']" [items]="admin"></nb-menu>
      <nb-menu *nbIsGranted="['view', 'commercial']" [items]="commercial"></nb-menu>
      <nb-menu *nbIsGranted="['view', 'stock']" [items]="stock"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  public user: NbMenuItem[] = MENU_USER;
  public admin: NbMenuItem[] = MENU_ADMIN;
  public commercial: NbMenuItem[] = MENU_COMMERCIAL;
  public stock: NbMenuItem[] = MENU_STOCK;

}
