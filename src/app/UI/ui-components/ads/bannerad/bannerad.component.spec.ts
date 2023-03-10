import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAdComponent } from './bannerad.component';

describe('BanneradComponent', () => {
  let component: BannerAdComponent;
  let fixture: ComponentFixture<BannerAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
