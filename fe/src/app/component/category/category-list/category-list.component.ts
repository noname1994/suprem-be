import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Category } from '../../../models/product/category.model';
import { Constant } from '../../../utils/constant';
import { CategoryService } from '../../../service/product/category.service';
import { Subscription, throwError } from 'rxjs';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { ArrayObject } from '../../../models/response/array.res';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {


  private arrCategory: Array<Category>;

  private defaultDate = new Date();

  private defaultImageCover = "../../../../assets/Koala.jpg";

  private pageNum: number = Constant.DEFAULT_PAGE_NUMBER;

  private pageSize: number = Constant.DEFAULT_PAGE_SIZE;

  private totalRecord: number = 100;

  private params = { pageNum: this.pageNum, pageSize: this.pageSize }

  /**
   * subscribe
   */
  private subscriptionGetAll: Subscription;

  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategory();
  }

  /**
   * Call Api
   */
  getAllCategory() {

    let params = { pageNum: this.pageNum, pageSize: this.pageSize };
    this.subscriptionGetAll = this.categoryService.getALlCategory(params).subscribe((resEntity: SuccessResponse<ArrayObject<Category[]>>) => {
      if (resEntity.code == Constant.CODE_SUCCESS) {
        this.totalRecord = resEntity.value.total;
        this.arrCategory = resEntity.value.list;
      }
    }, error => {
      console.error("Error get role!");
      return throwError(error);
    })
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
    this.router.navigateByUrl('/category/edit/' + _id);
  }

  onChangePageSize(value) {
    this.params.pageSize = value;
    this.getAllCategory();
  }


  /**
   * destroy
   */
  ngOnDestroy(): void {
    if (this.subscriptionGetAll) {
      this.subscriptionGetAll.unsubscribe;
    }
  }
}
