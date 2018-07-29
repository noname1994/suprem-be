import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerImageListComponent } from './banner-image-list.component';

describe('BannerImageListComponent', () => {
  let component: BannerImageListComponent;
  let fixture: ComponentFixture<BannerImageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerImageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
