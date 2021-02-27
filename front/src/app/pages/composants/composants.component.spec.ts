import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposantsComponent } from './composants.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbThemeModule, NbToastrModule } from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';

describe('ComposantsComponent', () => {
  let component: ComposantsComponent;
  let fixture: ComponentFixture<ComposantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposantsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbToastrModule.forRoot(),
        NbAuthModule.forRoot(),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
