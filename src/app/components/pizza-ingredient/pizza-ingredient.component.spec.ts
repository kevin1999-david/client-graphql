import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaIngredientComponent } from './pizza-ingredient.component';

describe('PizzaIngredientComponent', () => {
  let component: PizzaIngredientComponent;
  let fixture: ComponentFixture<PizzaIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
