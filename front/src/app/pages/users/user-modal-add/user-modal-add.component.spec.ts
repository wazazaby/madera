import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModalAddComponent } from './user-modal-add.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbDialogModule, NbDialogRef, NbDialogService, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserModalAddComponent', () => {
  let component: UserModalAddComponent;
  let fixture: ComponentFixture<UserModalAddComponent>;

  beforeEach(async () => {
    const dialMock = jasmine.createSpy();
    const dialMockRef = jasmine.createSpy();
    await TestBed.configureTestingModule({
      declarations: [ UserModalAddComponent ],
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
    fixture = TestBed.createComponent(UserModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
