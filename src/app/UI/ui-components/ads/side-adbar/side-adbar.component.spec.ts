import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideAdbarComponent } from './side-adbar.component';

describe('AdbarComponent', () => {
  let component: SideAdbarComponent;
  let fixture: ComponentFixture<SideAdbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideAdbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideAdbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
