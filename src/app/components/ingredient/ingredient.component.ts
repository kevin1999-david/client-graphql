import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from "@angular/router";

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { values } from "../../gqlTools";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {


  loading: boolean;



  public idIngredient: Number;
  public nameIngredient: String;
  public calorieIngredient: String;
  public ingredients: any;

  public infoID = {
    id: -1,
    name: ''
  }


  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }
  ngOnInit(): void {
    this.getAllIngredients();
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


  newIngredient(form) {
    this.apollo.mutate({
      mutation: values.createIngredient,
      variables: {
        ingredient: {
          name: this.nameIngredient,
          calories: this.calorieIngredient
        }
      }
    }).subscribe(({ data }) => {
      this.ingredients = (Object)(data).createIngredient;
      form.reset();
      console.log('got data', data);
    }, (error) => {
      console.log('This es an error')
      console.log('there was an error sending the query', error);
    });
  }

  deleteIngredientById(id: Number) {
    this.apollo.mutate({
      mutation: values.deleteIngredientById,
      variables: {
        id: id
      }
    }).subscribe(({ data }) => {
      this.ingredients = (Object)(data).deleteIngredient;
      console.log('got data', data);

    }, (error) => {
      console.log('This es an error')
      console.log('there was an error sending the query', error);
    });
  }



  setIdDelete(id, name) {
    this.infoID.id = id;
    this.infoID.name = name;
  }

  deleteYes() {
    this.deleteIngredientById(this.infoID.id);
  }

}




