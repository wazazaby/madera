import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationShowComponent } from './quotation-show.component';

describe('QuotationShowComponent', () => {
  let component: QuotationShowComponent;
  let fixture: ComponentFixture<QuotationShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
