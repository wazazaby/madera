import { Component, OnInit } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { FSEntry } from '../../interfaces/FsEntry';
import { TreeNode } from '../../interfaces/TreeNode';


@Component({
  selector: 'ngx-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
})
export class QuotationComponent implements OnInit {
  customColumn = 'Clients';
  defaultColumns = ['Nombre de devis', 'Documents', 'Date', 'Status'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  private data: TreeNode<any>[] = [
    {
      data: {Clients: 'Killan Mbappe', 'Nombre de devis': 5, type: 'folder'},
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
        {
          data: {
            Clients: 'devis-project-3', Documents: 'Relance', Date: new Date(),
          },
        },
        {
          data: {
            Clients: 'devis-project-4.docx', Documents: 'Autres', Date: new Date(),
          },
        },
      ],
    },
    {
      data: {Clients: 'Petro', 'Nombre de devis': 1, type: 'folder'},
      children: [
        {
          data:
            {
              Clients: 'devis-project-1.doc', Documents: 'Devis', Date: new Date(), Status: 'en cours',
            },
        },
      ],
    },

  ];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  ngOnInit(): void {
  }

}
