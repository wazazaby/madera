import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbDialogModule, NbDialogService, NbThemeModule, NbToastrModule } from '@nebular/theme';

import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    const dialMock = jasmine.createSpy();
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbToastrModule.forRoot(),
        NbAuthModule.forRoot(),
        NbDialogModule,
      ],
      providers: [
        {provide: NbDialogService, useClass: dialMock},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
