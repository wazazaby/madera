import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbInputModule, NbThemeModule } from '@nebular/theme';

import { RequestPasswordComponent } from './request-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequestPasswordComponent', () => {
  let component: RequestPasswordComponent;
  let fixture: ComponentFixture<RequestPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPasswordComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        NbInputModule,
        RouterTestingModule,
        NbThemeModule.forRoot(),
        NbAuthModule.forRoot({
          strategies: [
            NbPasswordAuthStrategy.setup({
              name: 'email',
            }),
          ],
        }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
