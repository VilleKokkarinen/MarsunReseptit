import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringUnitSearchComponent } from './measuring-unit-search.component';

describe('MeasuringUnitSearchComponent', () => {
  let component: MeasuringUnitSearchComponent;
  let fixture: ComponentFixture<MeasuringUnitSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuringUnitSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasuringUnitSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
