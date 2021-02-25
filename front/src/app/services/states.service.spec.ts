import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NbAuthModule, NbAuthService, NbPasswordAuthStrategy } from '@nebular/auth';

import { StatesService } from './states.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('StatesServiceService', () => {
  let service: StatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NbAuthModule.forRoot({
          strategies: [
            NbPasswordAuthStrategy.setup({
              name: 'email',
            }),
          ],
        }),
      ],
    });
    service = TestBed.inject(StatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
