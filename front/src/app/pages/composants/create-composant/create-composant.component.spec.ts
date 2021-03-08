import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComposantComponent } from './create-composant.component';

describe('CreateComposantComponent', () => {
  let component: CreateComposantComponent;
  let fixture: ComponentFixture<CreateComposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComposantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
