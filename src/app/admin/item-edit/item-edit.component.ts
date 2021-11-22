import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  id!: string;
  item!: Item;
  editItemForm!: FormGroup;
  categories: string[] = [];

  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();

    let urlId = this.route.snapshot.paramMap.get("itemId");
    if (urlId) {
      this.id = urlId;
      this.itemService.getItemsFromDatabase().subscribe((firebaseItems)=> {
        this.itemService.saveToServiceFromDatabase(firebaseItems);
        let itemFound = this.itemService.getItem(this.id);
      if (itemFound) {
        this.item = itemFound;
      }
      this.editItemForm = new FormGroup({
        imgSrc: new FormControl(this.item.imgSrc),
        title: new FormControl(this.item.title),
        price: new FormControl(this.item.price),
        category: new FormControl(this.item.category),
        isActive: new FormControl(this.item.isActive)
     });
      })
    }
  }

  onSubmit() {
    if (this.editItemForm.valid) {
      let itemIndex = this.itemService.getItemIndex(this.item);
      let item = new Item(
        this.editItemForm.value.imgSrc,
        this.editItemForm.value.title,
        this.editItemForm.value.price,
        this.editItemForm.value.category,
        this.editItemForm.value.isActive
      )
      this.itemService.editItem(itemIndex, item).subscribe(() => {
      this.router.navigateByUrl("/admin/vaata-esemeid");
      });
    }
  }

}
