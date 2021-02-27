import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbThemeModule, NbToastrModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';

describe('InterceptorService', () => {
  let service: InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbToastrModule.forRoot(),
        NbAuthModule.forRoot(),
      ],
    });
    service = TestBed.inject(InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
