import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item; //input võtab parentist, home on parent
  @Output() activeChangedEvent = new EventEmitter(); // output saadab parentisse
  @Input() isLoggedIn = false;

  constructor(private cartService: CartService,
    private itemService: ItemService) { }

  ngOnInit(): void {
  }

  onAddToCart(item: Item) {
    console.log(item);
    this.cartService.addToCart(item);
    this.cartService.cartChanged.next();
    // next ütleb, et pane sisu käima (asünkroonselt igal pool)
  }

  onItemActiveChange() {
    this.item.isActive = !this.item.isActive;
    this.itemService.saveItemsToDatabase().subscribe();
    this.activeChangedEvent.emit(this.item);    
  }

}
