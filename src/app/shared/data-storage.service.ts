import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { RecipeService } from '../recipes/recipes.service';
import { Recipes } from '../recipes/recipes.module';
import { map, tap, take, exhaustMap} from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';



@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService : RecipeService, private authService:AuthService){}

StoreRecipes()
    {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-27bb5.firebaseio.com/recipes.json', recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }

FetchRecipes()
{
        return this.http.get<Recipes[]>(
            'https://ng-course-recipe-book-27bb5.firebaseio.com/recipes.json').pipe(
    map(recipes => {
        return recipes.map(recipes => {
            return  {...recipes, ingredients:recipes.ingredients ? recipes.ingredients : []
            };
        });
    }),
    tap(recipes => {
        this.recipeService.setRecipes(recipes);
    })
    );

} 
            
}
