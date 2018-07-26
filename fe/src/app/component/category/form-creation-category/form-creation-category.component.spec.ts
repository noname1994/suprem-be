import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreationCategoryComponent } from './form-creation-category.component';

describe('FormCreationCategoryComponent', () => {
  let component: FormCreationCategoryComponent;
  let fixture: ComponentFixture<FormCreationCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCreationCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
