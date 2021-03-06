import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatesService } from '../../../services/states.service';
import { BridgeService } from '../../../services/bridge.service';
import { UtilsService } from '../../../services/utils.service';
import { Module } from '../../../interfaces/module';
import { Subject } from 'rxjs';
import { ResponsesApi } from '../../../interfaces/responses-api';
import { takeUntil } from 'rxjs/operators';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { TreeNode } from '../../../interfaces/TreeNode';
import { FSEntry } from '../../../interfaces/FsEntry';
import { Components } from '../../../interfaces/components';

@Component({
  selector: 'ngx-modulebyid',
  templateUrl: './modulebyid.component.html',
  styleUrls: ['./modulebyid.component.scss'],
})
export class ModulebyidComponent implements OnInit, OnDestroy {

  private id: number = 0;

  public module: Module;

  public customColumn = 'Labels';
  public defaultColumns = ['Nbre', 'Prix', 'Description', 'Reference'];
  public allColumns = [this.customColumn, ...this.defaultColumns];

  public dataSource: NbTreeGridDataSource<any>;

  public sortColumn: string;
  public sortDirection: NbSortDirection = NbSortDirection.NONE;
  public data: TreeNode<any>[] = [];

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private route: ActivatedRoute,
              public router: Router,
              private _dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private _utilsService: UtilsService) {
    // Récup l'id de la route
    this.route.params.subscribe((res) => {
      if (res) {
        this.data = [];
        this.dataSource = this._dataSourceBuilder.create(this.data);

        this.id = res.id;
        if (this.id > 0) {
          this._bridgeService.getModuleById(this.id)
            .pipe(takeUntil(this.destroyed))
            .subscribe((module: ResponsesApi<Module>) => {
              if (module && module.data && module.data['module']) {
                this.module = module.data['module'];

                const nbreCompo = this.module.components.length || 0;
                const child = [];
                let price = 0;
                this.module.components.forEach((c) => {
                  if (c && c.component) {
                    const compo: Components = c.component;
                    child.push({
                      data: {
                        Labels: compo.label,
                        Nbre: 1,
                        Prix: compo.price,
                        Description: compo.description,
                        Reference: compo.reference,
                      },
                    });
                    price += compo.price;
                  }
                });

                this.data.push({
                  data: {
                    Labels: this.module.label,
                    Nbre: nbreCompo,
                    Prix: price,
                    Description: this.module.description,
                    Reference: this.module.reference,
                    type: 'folder',
                  },
                  children: child,
                });

                this.dataSource = this._dataSourceBuilder.create(this.data);

              }
          });
        }

      } else {
        this.router.navigateByUrl('pages/modules').then();
      }
    });
  }

  ngOnInit(): void {
  }

  public updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  public getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  public getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
