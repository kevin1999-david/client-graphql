import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { values } from "../../gqlTools";
@Component({
  selector: 'app-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.css']
})
export class IngredientEditComponent implements OnInit {


  public idIngredient: Number;
  public nameIngredient: String;
  public calorieIngredient: String;


  public ingredient: any;

  private querySubscription: Subscription;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private apollo: Apollo
	) { }

  ngOnInit(): void {

    this._route.params.subscribe(params => {
			this.idIngredient = parseInt(params.id);
    });
    this.getIngredient(this.idIngredient);
  }

  getIngredient(id){
		this.querySubscription = this.apollo
			.watchQuery({
				query: values.ingredientById,
				variables: {
					id: id,
				},
			})
			.valueChanges.subscribe(({ data }) => {
				this.ingredient = (Object)(data).ingredients;
				this.nameIngredient = this.ingredient[0].name
				this.calorieIngredient = this.ingredient[0].calories;
			});
  }

updateIngredient(){
  this.apollo.mutate({
    mutation: values.updateIngredient,
    variables: {
      idLast: this.idIngredient,
      ingredientU: {
        name: this.nameIngredient,
        calories: this.calorieIngredient
      }
    }
  }).subscribe(({ data }) => {
    console.log('got data', data)
    //this._router.navigate(['/pizzas']);
    window.location.href = "/ingredients";

  }, (error) => {
    console.log('This es an error')
    console.log('there was an error sending the query', error);
  })
}

  
}
