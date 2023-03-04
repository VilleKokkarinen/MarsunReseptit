import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdbarComponent } from './adbar.component';

describe('AdbarComponent', () => {
  let component: AdbarComponent;
  let fixture: ComponentFixture<AdbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
