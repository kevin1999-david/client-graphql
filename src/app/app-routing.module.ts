import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaComponent } from "./components/pizza/pizza.component";
import { IngredientComponent } from "./components/ingredient/ingredient.component";
import { IngredientEditComponent } from "./components/ingredient-edit/ingredient-edit.component";
import { PizzaIngredientComponent } from "./components/pizza-ingredient/pizza-ingredient.component";
const routes: Routes = [
  { path: '', component: PizzaComponent },
  { path: 'pizzas', component: PizzaComponent },
  { path: 'ingredients', component: IngredientComponent },
  { path: 'ingredient-edit/:id', component: IngredientEditComponent },
  { path: 'pizza-ingredient/:id', component: PizzaIngredientComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
