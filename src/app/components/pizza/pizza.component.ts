import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { values } from "../../gqlTools";
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  loading: boolean;
  pizzas: any;

  public ingredientsSelected: Number[] = [];
  public namePizza: String;
  public originPizza: String

  public ingredients: any;

  public infoPD = {
    id: -1,
    name: ''
  }

  private querySubscription: Subscription;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getAllPizzas();
    this.getAllIngredients();
  }

  getAllPizzas() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: values.allPizzas
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.pizzas = data.pizzas;
        console.log(this.pizzas);
      });
  }

  getAllIngredients() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: values.allIngredients
    })
      .valueChanges
      .subscribe(({ data }) => {
        this.ingredients = data.ingredients;
        console.log(this.ingredients.length);

      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  deletePizzaById(id) {
    this.apollo.mutate({
      mutation: values.deletePizzaById,
      variables: {
        id: id
      }
    }).subscribe(({ data }) => {
      this.pizzas = (Object)(data).deletePizza;
      console.log('got data', data);

    }, (error) => {
      console.log('This es an error')
      console.log('there was an error sending the query', error);
    });

  }


  onSubmit(form) {
    console.log('Hola');
  }

  newPizza(form) {
    this.apollo.mutate({
      mutation: values.addPizza,
      variables: {
        pizza: {
          name: this.namePizza,
          origin: this.originPizza,
          ingredientIds: this.ingredientsSelected
        }
      }
    }).subscribe(({ data }) => {
      this.pizzas = (Object)(data).createPizza;
      form.reset();

      console.log('got data', data);
    }, (error) => {
      console.log('This es an error')
      console.log('there was an error sending the query', error);
    });
  }

  test() {
    console.log(this.namePizza);
    console.log(this.originPizza);
  }


  getPizzaById() {
    this.querySubscription = this.apollo
      .watchQuery({
        query: values.pizzaById,
        variables: {
          id: 294,
        },
      })
      .valueChanges.subscribe(({ data }) => {
        let pizza = (Object)(data).pizzas;
        console.log(pizza);
      });
  }

  active(id) {

    if (this.ingredientsSelected.includes(id)) {
      let index = this.ingredientsSelected.indexOf(id);
      this.ingredientsSelected.splice(index, 1);
    } else {
      this.ingredientsSelected.push(id);
    }

    console.log(this.ingredientsSelected);

  }

  setIdDelete(id, name) {
    this.infoPD.id = id;
    this.infoPD.name = name;
  }

  deleteYes() {
    this.deletePizzaById(this.infoPD.id);
  }

}
