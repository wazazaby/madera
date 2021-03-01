import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';

import { BridgeService } from './bridge.service';
import { NbDialogModule, NbThemeModule, NbToastrModule } from '@nebular/theme';

describe('BridgeService', () => {
  let service: BridgeService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NbAuthModule.forRoot(),
        NbThemeModule.forRoot(),
        NbToastrModule.forRoot(),
        NbDialogModule,
      ],
    });
    service = TestBed.inject(BridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
