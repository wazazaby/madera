import { Injectable } from '@angular/core';

@Injectable()
export class PeriodsService {
  getYears() {
    return [
      '2010', '2011', '2012',
      '2013', '2014', '2015',
      '2016', '2017', '2018',
    ];
  }

  getMonths() {
    return [
      'Jan', 'Feb', 'Mar',
      'Avr', 'Mai', 'Jui',
      'Juil', 'Aou', 'Sept',
      'Oct', 'Nov', 'Dec',
    ];
}

  getWeeks() {
    return [
      'Lun',
      'Mar',
      'Mer',
      'Jeu',
      'Ven',
      'Sam',
    ];
  }
}
