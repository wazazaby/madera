import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

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
              public router: Router) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    // Event de click sur le profil
    this.menuService.onItemClick().subscribe((value) => {
      if (value && value.item && value.item.data) {
        this.onItemSelection(value.item.data.id);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
}
