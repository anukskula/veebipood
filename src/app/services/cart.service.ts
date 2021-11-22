import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from 'src/app/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsInCart: {cartItem: Item, quantity: number}[] = [{cartItem: {"imgSrc":"https://i.ebayimg.com/thumbs/images/g/OOYAAOSwZH5gPaUm/s-l225.webp","title":"KDEAM Classic Men Polarized Sunglasses Strengthen TAC Mirror Anti-Glare UV400 ","price":13.79,"category":"sunglasses", isActive: true}, quantity: 6}];
  cartChanged = new Subject();

  constructor() { }

  addToCart(item: Item): void {
    let cartItem = this.productsInCart.find(productInCart => productInCart.cartItem.title == item.title);
    if (cartItem) {
      // cartItem.quantity = cartItem.quantity + 1;
      cartItem.quantity++;
    } else {
      this.productsInCart.push({cartItem: item, quantity: 1});
    }
  }

  getItemsFromCart(): {cartItem: Item, quantity: number}[] {
    return this.productsInCart.slice();
  }

  deleteOneFromCart(item: {cartItem: Item, quantity: number}): void {
    let index = this.productsInCart.indexOf(item);
    if (index != -1) {
      if (this.productsInCart[index].quantity == 1) {
        this.deleteItemFromCart(index);
      } else {
        this.productsInCart[index].quantity--;
      }
    }
  }

  deleteItemFromCart(index: number): void {
    this.productsInCart.splice(index, 1)
  }

  deleteAllFromCart(): void {
    this.productsInCart = [];
  }

}
