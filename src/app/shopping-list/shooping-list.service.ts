import {Ingredient} from '../shared/Ingrident.module';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingList{
    ingredientsChannged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    ingredients: Ingredient[] = [ new Ingredient ('Apples', 5),
    new Ingredient ('Oranges', 10) ];


    getIngeridents()
    {
        return this.ingredients.slice();
    }

    addIngredient(ingredient:Ingredient)
    {
        this.ingredients.push(ingredient);
        this.ingredientsChannged.next(this.ingredients.slice());
    }

    getIngredient(index:number)
    {
        return this.ingredients[index];
    }

    updateIngredient(index:number, newIngredient:Ingredient)
    {
        this.ingredients[index] = newIngredient;
        this.ingredientsChannged.next(this.ingredients.slice());
    }
    addIngredients(ingredients:Ingredient[])
       {
        //for(let ingredient of ingredients)
        //{

          //  this.addIngredient(ingredient);
        //}
        this.ingredients.push(...ingredients);
        this.ingredientsChannged.next(this.ingredients.slice());// it is used as a copy of a file

    }
    deleteIngredient(index:number)
    {
        this.ingredients.splice(index, 1);
        this.ingredientsChannged.next(this.ingredients.slice());
    }
}