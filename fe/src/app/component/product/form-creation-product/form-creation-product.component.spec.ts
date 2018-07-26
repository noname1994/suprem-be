import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreationProductComponent } from './form-creation-product.component';

describe('FormCreationProductComponent', () => {
  let component: FormCreationProductComponent;
  let fixture: ComponentFixture<FormCreationProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCreationProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
