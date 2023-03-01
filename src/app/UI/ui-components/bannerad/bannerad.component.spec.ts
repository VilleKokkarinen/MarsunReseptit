import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanneradComponent } from './bannerad.component';

describe('BanneradComponent', () => {
  let component: BanneradComponent;
  let fixture: ComponentFixture<BanneradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanneradComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanneradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
