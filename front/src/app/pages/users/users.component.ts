import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Roles } from '../../interfaces/roles';
import { SmartSelectConfig, SmartTableAdd, SmartTableDelete, SmartTableEdit } from '../../interfaces/SmartTableSetting';
import { Users } from '../../interfaces/users';
import { BridgeService } from '../../services/bridge.service';
import { StatesService } from '../../services/states.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {

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
      editable: false,
      addable: true,
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
  public data: Users[] = [];
  /** Liste de rôles sous la forme de select */
  private listRoles: SmartSelectConfig[] = [];
  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadRoles();
  }

  public onCreate(evt: SmartTableAdd<Users>): void {
    if (evt && evt.newData) {
      const user: Users = evt.newData;

      this._bridgeService.addUsers(user)
        .pipe(takeUntil(this.destroyed))
        .subscribe(
          (res) => {
            if (res) {
              evt.confirm.resolve();
              this._utilsService.showToast(res.messages);
            }
          },
          (err) => {
            this._utilsService.showToast(err.statusText, 'danger');
          },
        );

    }
  }

  public onEdit(evt: SmartTableEdit<Users>): void {
    if (evt && evt.data && evt.newData) {
      const id: number = evt.data.id;
      const newUser: Users = {
        createdAt: evt.data.createAt,
        email: evt.newData.email || evt.data.email,
        firstName: evt.newData.firstName || evt.newData.firstName,
        lastName: evt.newData.lastName || evt.newData.lastName,
        phoneNumber: evt.newData.phoneNumber || evt.newData.phoneNumber,
        roleId: evt.data.roleId,
        updatedAt: evt.data.updatedAt,
      };

      this._bridgeService.setUsers(id, newUser)
        .pipe(takeUntil(this.destroyed))
        .subscribe(
          (res) => {
            if (res) {
              evt.confirm.resolve();
              this._utilsService.showToast(res.messages);
            }
          },
          (err) => {
            this._utilsService.showToast(err.statusText, 'danger');
          });
    }
  }

  public onDelete(evt: SmartTableDelete<Users>): void {
    if (evt.data) {
      this._bridgeService.deleteUsers(evt.data.id)
        .pipe(takeUntil(this.destroyed))
        .subscribe(
          (res) => {
            this._utilsService.showToast(res.messages );
          },
          (err) => {
            this._utilsService.showToast(err.statusText, 'danger');
          },
        );
    }
  }

  /**
   * Détruit les observables
   */
  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  /**
   * Charge la liste des utilisateurs
   */
  private loadUser(): void {
    this._stateService.usersAsObservable()
      .pipe(takeUntil(this.destroyed))
      .subscribe((user: Users[]) => {
        this.data = user;
      });
  }

  /**
   * Charge la liste des rôles
   */
  private loadRoles(): void {
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
}
