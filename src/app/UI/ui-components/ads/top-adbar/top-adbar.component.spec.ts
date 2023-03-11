import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAdbarComponent } from './top-adbar.component';

describe('TopAdbarComponent', () => {
  let component: TopAdbarComponent;
  let fixture: ComponentFixture<TopAdbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopAdbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopAdbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
