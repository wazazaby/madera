import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { FSEntry } from '../../interfaces/FsEntry';
import { TreeNode } from '../../interfaces/TreeNode';
import { StatesService } from '../../services/states.service';
import { BridgeService } from '../../services/bridge.service';
import { ResponsesApi } from '../../interfaces/responses-api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ngx-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
})
export class QuotationComponent implements OnInit, OnDestroy {
  public customColumn = 'Labels';
  public defaultColumns = ['Nombres', 'Documents', 'Date', 'Statut'];
  public allColumns = [this.customColumn, ...this.defaultColumns];

  public dataSource: NbTreeGridDataSource<any>;

  public sortColumn: string;
  public sortDirection: NbSortDirection = NbSortDirection.NONE;
  public data: TreeNode<any>[] = [];

  /** Subject utilisé pour le unsubscribe de tout les obs */
  private destroyed = new Subject();

  constructor(private _dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
              private _stateService: StatesService,
              private _bridgeService: BridgeService,
              private cdref: ChangeDetectorRef) {
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

  ngOnInit(): void {

    this._bridgeService.getClientsQuotation()
      .pipe(takeUntil(this.destroyed))
      .subscribe((cli: ResponsesApi<any[]>) => {
        if (cli && cli.data && cli.data['clients'] && cli.data['clients'].length > 0) {
          this.data = [];
          this.dataSource = this._dataSourceBuilder.create(this.data);

          const clients: any[] = cli.data['clients'];

          if (clients.length > 0) {

            clients.forEach(c => {
              const quotation: any[] = c.client.quotations;
              const child = [];

              const nbrQuotation = quotation.length;
              quotation.forEach((q) => {

                child.push(
                  {
                    data: {
                      Labels: q.label,
                      Nombres: 1,
                      Documents: 'Devis',
                      Date: formatDate(q.updatedAt, 'short', 'fr-FR'),
                      Statut: this._stateService.quotationStatus.get(q.statusId).label,
                    },
                  },
                );
              });

              this.data.push({
                data: {
                  Labels: `${c.firstName} ${c.lastName}`,
                  Nombres: `${nbrQuotation}`,
                  type: 'folder',
                },
                children: child,
              });
            });
          }

          this.dataSource = this._dataSourceBuilder.create(this.data);
        }
    });
  }


  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
