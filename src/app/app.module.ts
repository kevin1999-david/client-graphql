import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaComponent } from './components/pizza/pizza.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { IngredientEditComponent } from './components/ingredient-edit/ingredient-edit.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PizzaIngredientComponent } from './components/pizza-ingredient/pizza-ingredient.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaComponent,
    IngredientComponent,
    IngredientEditComponent,
    PizzaIngredientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
