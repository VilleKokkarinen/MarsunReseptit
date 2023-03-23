import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeTestModalComponent } from './theme-test-modal.component';

describe('ThemeTestModalComponent', () => {
  let component: ThemeTestModalComponent;
  let fixture: ComponentFixture<ThemeTestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeTestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
