import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Roles } from '../../interfaces/roles';
import { SmartSelectConfig } from '../../interfaces/SmartTableSetting';
import { Users } from '../../interfaces/users';
import { StatesService } from '../../services/states.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  constructor(private _stateService: StatesService,
              private _utilsService: UtilsService) { }

  public columns = {
    firstName: {
      title: 'Prénom',
      type: 'string',
    },
    lastName: {
      title: 'Nom',
      type: 'string',
    },
    phoneNumber: {
      title: 'Téléphone',
      type: 'string',
    },
    email: {
      title: 'Email',
      type: 'string',
    },
    roleId: {
      title: 'Rôle',
      valuePrepareFunction: (date) => {
        return this._utilsService.formatRole(date);
      },
      filter: {
        type: 'list',
        config: {
          type: 'list',
          selectText: 'Choisissez le rôle',
          list: [],
        },
      },
      filterFunction(cell: any, search?: string): boolean {
        if (search === JSON.stringify(cell)) {
          return true;
        }
      },
      editor: {
        type: 'list',
        config: {
          list: [],
        },
      },
    },
    createdAt: {
      title: 'Crée le',
      type: 'string',
      valuePrepareFunction: (date) => {
        return this._utilsService.formatDate(date);
      },
      editable: false,
      addable: false,
    },
    updatedAt: {
      title: 'Modifier le',
      type: 'date',
      valuePrepareFunction: (date) => {
        return this._utilsService.formatDate(date);
      },
      editable: false,
      addable: false,
    },
  };

  /** Liste de rôles sous la forme de select */
  private listRoles: SmartSelectConfig[] = [];

  public data: Users[] = [];

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  ngOnInit(): void {
    this.loadUser();
    this.loadRoles();
  }

  /**
   * Charge la liste des utilisateurs
   */
  private loadUser() {
    this._stateService.usersAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((user: Users[]) => {
        this.data = user;
      });
  }

  /**
   * Charge la liste des rôles
   */
  private loadRoles() {
    this._stateService.rolesAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((role: Roles[]) => {
        this.listRoles = [];
        role.forEach(r => {
          this.listRoles.push({value: r.id, title: r.label});
        });
        this.columns.roleId.filter.config.list = this.listRoles;
        this.columns.roleId.editor.config.list = this.listRoles;
        this.columns = Object.assign({}, this.columns);
      });
  }

  onCreate($event: any) {
    console.log('*evt onCreate user', $event);
  }

  onEdit($event: any) {
    console.log('*evt onEdit user', $event);
  }

  onDelete($event: any) {
    console.log('*evt onDelete user', $event);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
