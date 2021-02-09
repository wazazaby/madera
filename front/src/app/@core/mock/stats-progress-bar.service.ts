import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { ProgressInfo, StatsProgressBarData } from '../data/stats-progress-bar';

@Injectable()
export class StatsProgressBarService extends StatsProgressBarData {
  private progressInfoData: ProgressInfo[] = [
    {
      title: 'Profit Journalier',
      value: 572900,
      activeProgress: 70,
      description: '+70%',
    },
    {
      title: 'Nouvelles commandes',
      value: 6378,
      activeProgress: 30,
      description: '-30%',
    },
    {
      title: 'Clients',
      value: 400,
      activeProgress: 15,
      description: '+15%',
    },
  ];

  getProgressInfoData(): Observable<ProgressInfo[]> {
    return observableOf(this.progressInfoData);
  }
}
