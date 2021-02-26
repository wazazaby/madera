import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { decodeJwtPayload, NbAuthService, NbAuthToken } from '@nebular/auth';
import { Router } from '@angular/router';
import { Users } from '../../../interfaces/users';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: Users;

  currentTheme = 'cosmic';

  userMenu: NbMenuItem[] = [
    { data: {id: 1}, title: 'Profile' },
    { data: {id: 2}, title: 'Log out' },
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private authService: NbAuthService,
              private layoutService: LayoutService,
              private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService,
              public router: Router) {
  }

  ngOnInit() {
    // Si aucune data n'est trouver on load tout
    if (this._utilsService.ifNodata()) {
      this._bridgeService.initData();
    }

    this.currentTheme = this.themeService.currentTheme;

    this.authService.getToken()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: NbAuthToken) => {
        if (res) {
          this.user = decodeJwtPayload(res.getValue());
        } else {
          this.onItemSelection(2);
        }
    });

    // Event de click sur le profil
    this.menuService.onItemClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
      if (value && value.item && value.item.data) {
        this.onItemSelection(value.item.data.id);
      }
    });
  }

  private onItemSelection(title: number) {
    switch (title) {
      case 1:
        this.router.navigateByUrl('pages/profil').then();
        break;
      case 2:
        this.router.navigateByUrl('auth/logout').then();
        break;
    }
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  public navigateHome(): boolean {
    this.router.navigateByUrl('dashboard').then();
    return false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
