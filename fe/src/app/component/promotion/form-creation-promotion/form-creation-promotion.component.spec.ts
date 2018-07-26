import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreationPromotionComponent } from './form-creation-promotion.component';

describe('FormCreationPromotionComponent', () => {
  let component: FormCreationPromotionComponent;
  let fixture: ComponentFixture<FormCreationPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCreationPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreationPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
