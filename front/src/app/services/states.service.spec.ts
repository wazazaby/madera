import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NbAuthModule, NbAuthService, NbTokenService } from '@nebular/auth';

import { StatesService } from './states.service';

describe('StatesServiceService', () => {
  let service: StatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NbAuthModule.forRoot(),
      ],
    });
    service = TestBed.inject(StatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
