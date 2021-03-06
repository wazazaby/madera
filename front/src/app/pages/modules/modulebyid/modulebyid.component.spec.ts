import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulebyidComponent } from './modulebyid.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbDialogModule, NbDialogRef, NbDialogService, NbThemeModule, NbToastrModule } from '@nebular/theme';

describe('ModulebyidComponent', () => {
  let component: ModulebyidComponent;
  let fixture: ComponentFixture<ModulebyidComponent>;

  beforeEach(async () => {
    const dialMock = jasmine.createSpy();
    const dialMockRef = jasmine.createSpy();
    await TestBed.configureTestingModule({
      declarations: [ ModulebyidComponent ],
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
    fixture = TestBed.createComponent(ModulebyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
