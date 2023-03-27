import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapSearchComponent } from './roadmap-search.component';

describe('RoadmapSearchComponent', () => {
  let component: RoadmapSearchComponent;
  let fixture: ComponentFixture<RoadmapSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
