import gql from "graphql-tag";
export const values = {
  allPizzas: gql`
    query{
        pizzas{
          id
          name
          origin
        }
      }
    `,

  pizzaById: gql`
    query pizzas($id: Int!){
      pizzas(id: $id){
        id
        name
        origin
        ingredients{
          id
          name
          calories
        }
      }
    }
    `
  ,
  ingredientById: gql`
  query ingredients($id: Int!){
    ingredients(id: $id){
      id
      name
      calories
    }
  }
  `
  ,
  allIngredients: gql`
    query{
        ingredients{
          id
          name
          calories
        }
      }
    
    `,
  deletePizzaById: gql`
    mutation deletePizza($id: Int!){
        deletePizza(id: $id){
            id
            name
            origin
          }
      }
    `,

  addPizza: gql`
    mutation createPizza($pizza: PizzaInput!) {
      createPizza(pizza:$pizza) {
        id
        name
        origin
      }
    }
    `,

  updatePizza: gql`
    mutation updatePizza($idLast: Int!, $pizzaU: PizzaInput!){
      updatePizza(idLast: $idLast, pizzaU: $pizzaU){
        id
        name
        origin   
      }
    }
    
    `,
  allPizzaIngredients: gql`
      query pizzaIngredients($id: Int!){
          pizzaIngredients(id: $id){
          id
          name
          calories
        }
      }
  `,
  createPizzaIngredient: gql`
  mutation createPizzaIngredient($idPizza: Int!, $nameIngredient: String!){
    createPizzaIngredient(idPizza: $idPizza, nameIngredient: $nameIngredient){
      id
      name
      calories
    }
  }
  
  `,
  deletePizzaIngredient: gql`
  mutation deletePizzaIngredient($idPizza: Int!, $idIngredient: Int!){
    deletePizzaIngredient(idPizza: $idPizza, idIngredient: $idIngredient){
      id
      name
      calories
    }
  }
  `,
  createIngredient: gql`
  mutation createIngredient($ingredient: IngredientInput!){
    createIngredient(ingredient: $ingredient){
      id
      name
      calories
    }
  }
  `,

  deleteIngredientById: gql`
  mutation deleteIngredient($id: Int!){
    deleteIngredient(id: $id){
      id
      name
      calories
    }
  }
  `,

updateIngredient: gql`

mutation updateIngredient($idLast: Int!, $ingredientU: IngredientInput!){
  updateIngredient(idLast: $idLast, ingredientU: $ingredientU){
    id
    name
    calories
  }
}
`

}

