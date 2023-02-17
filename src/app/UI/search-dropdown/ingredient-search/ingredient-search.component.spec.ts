import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientSearchComponent } from './ingredient-search.component';

describe('IngredientSearchComponent', () => {
  let component: IngredientSearchComponent;
  let fixture: ComponentFixture<IngredientSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
