import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: string[] = [];

  constructor() { }

  getCategories() {
    this.categories = JSON.parse(localStorage.getItem("categories") as string) || [];
    return this.categories.slice();
  }

  deleteCategory(category: string) {
    let index = this.categories.indexOf(category);
    this.categories.splice(index, 1);
    this.saveToLocalStorage();
  }
  addCategory(category: string) {
    this.categories.push(category);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }
}
