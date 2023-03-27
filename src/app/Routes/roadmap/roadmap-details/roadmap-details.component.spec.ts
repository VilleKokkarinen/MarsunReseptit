import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapDetailsComponent } from './roadmap-details.component';

describe('RoadmapDetailsComponent', () => {
  let component: RoadmapDetailsComponent;
  let fixture: ComponentFixture<RoadmapDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
