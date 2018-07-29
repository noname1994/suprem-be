import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreationBannerImgComponent } from './form-creation-banner-img.component';

describe('FormCreationBannerImgComponent', () => {
  let component: FormCreationBannerImgComponent;
  let fixture: ComponentFixture<FormCreationBannerImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCreationBannerImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreationBannerImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
