import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersModalAddComponent } from './customers-modal-add.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbDialogModule, NbDialogRef, NbDialogService, NbThemeModule, NbToastrModule } from '@nebular/theme';

describe('CustomersModalAddComponent', () => {
  let component: CustomersModalAddComponent;
  let fixture: ComponentFixture<CustomersModalAddComponent>;

  beforeEach(async () => {
    const dialMock = jasmine.createSpy();
    const dialMockRef = jasmine.createSpy();
    await TestBed.configureTestingModule({
      declarations: [ CustomersModalAddComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NbAuthModule.forRoot({
          strategies: [
            NbPasswordAuthStrategy.setup({
              name: 'email',
            }),
          ],
        }),
        NbThemeModule.forRoot(),
        NbToastrModule.forRoot(),
        NbDialogModule,
      ],
      providers: [
        {provide: NbDialogService, useClass: dialMock},
        {provide: NbDialogRef, useClass: dialMockRef},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
