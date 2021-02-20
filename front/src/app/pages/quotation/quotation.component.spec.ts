import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationComponent } from './quotation.component';
import { NbInputModule, NbThemeModule, NbTreeGridModule } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';

describe('QuotationComponent', () => {
  let component: QuotationComponent;
  let fixture: ComponentFixture<QuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        NbTreeGridModule,
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule,
        NbInputModule,
        NbThemeModule.forRoot(),
        NbAuthModule.forRoot({
          strategies: [
            NbPasswordAuthStrategy.setup({
              name: 'email',
            }),
          ],
          forms: {},
        }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
