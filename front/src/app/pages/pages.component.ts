import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { DEFAULT_MENU, MENU_ADMIN, MENU_COMMERCIAL, MENU_STOCK, MENU_USER } from './pages-menu';

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
  public admin: NbMenuItem[] = [...DEFAULT_MENU, ...MENU_ADMIN];
  public commercial: NbMenuItem[] = [...DEFAULT_MENU, ...MENU_COMMERCIAL];
  public stock: NbMenuItem[] = [...DEFAULT_MENU, ...MENU_STOCK];

}
