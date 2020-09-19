import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from "@angular/router";


import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { values } from "../../gqlTools";

@Component({
  selector: 'app-pizza-ingredient',
  templateUrl: './pizza-ingredient.component.html',
  styleUrls: ['./pizza-ingredient.component.css']
})
export class PizzaIngredientComponent implements OnInit {
  loading: any;

  public idPizza: Number;
  public namePizza: String;
  public originPizza: String;

  public nameIngredient: String;
  public ingSelected: String;

  public pizzaIngredients: any;
  public ingredients: any;

  private querySubscription: Subscription;


  test() {
    console.log(this.ingSelected);
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {

    this.getAllIngredients();
    this._route.params.subscribe(params => {
      this.idPizza = parseInt(params.id);
    });
    this.getPizza(this.idPizza);
    this.getAllPizzaIngredients(this.idPizza);
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }


  getPizza(id: Number) {
    this.querySubscription = this.apollo
      .watchQuery({
        query: values.pizzaById,
        variables: {
          id: id,
        },
      })
      .valueChanges.subscribe(({ data }) => {
        const pizzaFound = ((Object)(data).pizzas)[0];
        this.namePizza = pizzaFound.name;
        this.originPizza = pizzaFound.origin;
      });
  }



	updatePizza() {
		this.apollo.mutate({
			mutation: values.updatePizza,
			variables: {
				idLast: this.idPizza,
				pizzaU: {
					name: this.namePizza,
					origin: this.originPizza
				}
			}
		}).subscribe(({ data }) => {
			console.log('got data', data)
			//this._router.navigate(['/pizzas']);
			window.location.href = "/pizzas";

		}, (error) => {
			console.log('This es an error')
			console.log('there was an error sending the query', error);
		});

	}


  getAllPizzaIngredients(id: Number) {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: values.allPizzaIngredients,
      variables: {
        id: id
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.pizzaIngredients = data.pizzaIngredients;
      });
  }

  getAllIngredients() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: values.allIngredients
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.ingredients = data.ingredients;
      });
  }
  createPizzaIngredient() {
    this.apollo.mutate({
      mutation: values.createPizzaIngredient,
      variables: {
        idPizza: this.idPizza,
        nameIngredient: this.ingSelected
        
      }
    }).subscribe(({ data }) => {
      this.pizzaIngredients = (Object)(data).createPizzaIngredient;
      console.log('got data', data);
    }, (error) => {
      console.log('This es an error')
      console.log('there was an error sending the query', error);
    });
  }
  deletePizzaIngredient(idPizza: Number, idIngredient: Number) {


    console.log(idPizza);
    console.log(idIngredient);

    this.apollo.mutate({
      mutation: values.deletePizzaIngredient,
      variables: {
        idPizza: idPizza,
        idIngredient: idIngredient
      }
    }).subscribe(({ data }) => {
      this.pizzaIngredients = (Object)(data).deletePizzaIngredient;
      console.log('got data', data);
    }, (error) => {
      console.log('This es an error')
      console.log('there was an error sending the query', error);
    });
  }


}
