import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { FSEntry } from '../../interfaces/FsEntry';
import { TreeNode } from '../../interfaces/TreeNode';
import { StatesService } from '../../services/states.service';
import { BridgeService } from '../../services/bridge.service';
import { Client } from '../../interfaces/client';


@Component({
  selector: 'ngx-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
})
export class QuotationComponent implements OnInit {
  public customColumn = 'Clients';
  public defaultColumns = ['Nombre de devis', 'Documents', 'Date', 'Status'];
  public allColumns = [this.customColumn, ...this.defaultColumns];

  public dataSource: NbTreeGridDataSource<any>;

  public sortColumn: string;
  public sortDirection: NbSortDirection = NbSortDirection.NONE;
  public data: TreeNode<any>[] = [];

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
    this._stateService.clientsAsObservable().subscribe((cli: Client[]) => {
      // Nettoie le tableau
      this.data = [];
      this.dataSource = this._dataSourceBuilder.create(this.data);
      if (cli && cli.length > 0) {

        console.log('*client', cli);

        cli.forEach((c: Client) => {
          const nbrQuotation = c.quotation && c.quotation.length > 0 ? c.quotation.length : 0;

          this.data.push({
            data: {
              Clients: `${c.firstName} ${c.lastName}`,
              'Nombre de devis': `${nbrQuotation}`,
              type: 'folder',
            },
            children: [
              {
                data:
                  {
                    Clients: 'devis-project-1.doc', Documents: 'Devis', Date: new Date(), Status: 'en cours',
                  },
              },
              {
                data: {
                  Clients: 'devis-project-2.doc', Documents: 'Facture', Date: new Date(),
                },
              },
            ],
          });
        });
        this.dataSource = this._dataSourceBuilder.create(this.data);
      }
      this.cdref.detectChanges();
    });
  }

}
