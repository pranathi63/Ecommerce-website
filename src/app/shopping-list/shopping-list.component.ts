import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient} from '../shared/Ingrident.module'
import { ShoppingList } from './shooping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private subscription:Subscription;

  constructor(private slService: ShoppingList) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngeridents();
    this.subscription = this.slService.ingredientsChannged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients;
    });

    
  }
  onEditItem(index:number)
  {
    this.slService.startedEditing.next(index);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
