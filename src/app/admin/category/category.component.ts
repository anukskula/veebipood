import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: string[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

  onDeleteCategory(category: string) {
    this.categoryService.deleteCategory(category);
    this.categories = this.categoryService.getCategories();
  }

  onSubmit(form: NgForm) {
    this.categoryService.addCategory(form.value.category);
    this.categories = this.categoryService.getCategories();
    form.reset();
  }

}
