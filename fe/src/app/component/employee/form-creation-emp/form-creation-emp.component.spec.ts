import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreationEmpComponent } from './form-creation-emp.component';

describe('FormCreationEmpComponent', () => {
  let component: FormCreationEmpComponent;
  let fixture: ComponentFixture<FormCreationEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCreationEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreationEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
