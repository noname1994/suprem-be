import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditPromotionComponent } from './form-edit-promotion.component';

describe('FormEditPromotionComponent', () => {
  let component: FormEditPromotionComponent;
  let fixture: ComponentFixture<FormEditPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
