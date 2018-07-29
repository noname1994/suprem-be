import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Category } from '../../../models/product/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  private arrCategory: Array<Category>;

  private defaultDate = new Date();

  private defaultImageCover = "../../../../assets/Koala.jpg";

  constructor(private router: Router) { }

  ngOnInit() {
    this.getAllCategory();
  }

  /**
   * Get data from server
   */
  getAllCategory() {
    this.arrCategory = [
      { _id: "00001", name: "Category 1", imageCover: this.defaultImageCover, status: "ACTIVE", description: "Nothing to write...", createdAt: this.defaultDate, updatedAt: this.defaultDate },
      { _id: "00002", name: "Category 2", imageCover: this.defaultImageCover, status: "ACTIVE", description: "Nothing to write...", createdAt: this.defaultDate, updatedAt: this.defaultDate },
      { _id: "00003", name: "Category 3", imageCover: this.defaultImageCover, status: "ACTIVE", description: "Nothing to write...", createdAt: this.defaultDate, updatedAt: this.defaultDate }
    ]
  }


  /**
   * user action
   */
  openFormCreationCategory() {
    this.router.navigateByUrl('/category/create');
  }

  openViewDetailCategory(_id) {
    console.log("openViewDetailCategory : ", _id);
  }

  openEditForm(_id) {
    this.router.navigateByUrl('/category/edit?_id=' + _id);
  }
}
