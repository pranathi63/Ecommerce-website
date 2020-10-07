import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingrident.module';
import { ShoppingList } from '../shooping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription:Subscription;
  editMode = false;
  edittedItemIndex : number;
  edittedItem:Ingredient;
   constructor(private slService:ShoppingList) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index:number) => {
        this.edittedItemIndex = index;
        this.editMode = true;
        this.edittedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        })
      }
      );
  }
  onAddItem(form:NgForm)
  {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode)
    {
      this.slService.updateIngredient(this.edittedItemIndex, newIngredient);
    }
    else{
    this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();

  }
  onClear()
  {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete()
  {
    this.slService.deleteIngredient(this.edittedItemIndex);
    this.onClear();

  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

 

}
