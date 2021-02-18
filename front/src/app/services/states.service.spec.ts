import { TestBed } from '@angular/core/testing';

import { StatesService } from './states.service';

describe('StatesServiceService', () => {
  let service: StatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
