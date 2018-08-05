import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Category } from '../../../models/product/category.model';
import { Constant } from '../../../utils/constant';
import { CategoryService } from '../../../service/product/category.service';
import { Subscription, throwError } from 'rxjs';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { ArrayObject } from '../../../models/response/array.res';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';

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

  private arrIndexPage: Array<Number> = [];

  private arrSelectedIndexPage: Array<Boolean> = [];

  private positionIndexPageCliced = 0;


  /**
   * subscribe
   */
  private subscriptionGetAll: Subscription;

  constructor(private router: Router, private categoryService: CategoryService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllCategory();
  }

  // pagination
  setupPagination() {

    this.arrSelectedIndexPage = [];
    this.arrIndexPage = [];
    let numberPage = this.totalRecord / this.pageSize;

    for (let i = 0; i < numberPage; i++) {
      this.arrIndexPage.push(i);
      this.arrSelectedIndexPage[i] = false;
    }
    this.arrSelectedIndexPage[this.positionIndexPageCliced] = true;
    console.log(this.arrIndexPage)
  }

  /**
   * Call Api
   */
  getAllCategory() {
    this.subscriptionGetAll = this.categoryService.getALlCategory(this.params).subscribe((resEntity: SuccessResponse<ArrayObject<Category[]>>) => {
      this.totalRecord = resEntity.value.total;
      this.arrCategory = resEntity.value.list;
      this.setupPagination();
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
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
    this.pageSize = value;
    this.params.pageSize = value;
    this.positionIndexPageCliced = 0;
    this.getAllCategory();
  }

  changePageNum(index) {
    this.pageNum = index;
    this.params.pageNum = this.pageNum;
  }

  preIndexPageClicked(index) {
    if (this.positionIndexPageCliced > 0) {
      this.arrSelectedIndexPage[this.positionIndexPageCliced] = false;
      this.arrSelectedIndexPage[this.positionIndexPageCliced - 1] = true;
      this.positionIndexPageCliced = this.positionIndexPageCliced - 1;
      this.changePageNum(this.positionIndexPageCliced);
      this.getAllCategory();
    }
  }


  IndexPageClicked(index) {
    if (index != this.positionIndexPageCliced) {
      this.arrSelectedIndexPage[this.positionIndexPageCliced] = false;
      this.arrSelectedIndexPage[index] = true;
      this.positionIndexPageCliced = index;
      this.changePageNum(index);
      this.getAllCategory();
    }
  }

  lastIndexPageClicked() {
    if (this.positionIndexPageCliced < this.arrIndexPage.length - 1) {
      this.arrSelectedIndexPage[this.positionIndexPageCliced] = false;
      this.arrSelectedIndexPage[this.positionIndexPageCliced + 1] = true;
      this.positionIndexPageCliced = this.positionIndexPageCliced + 1;
      this.changePageNum(this.positionIndexPageCliced);
      this.getAllCategory();
    }
  }

  /**
   * handle error
   */
  private handleError(error) {
    this.notificationService.createNotification(
      NotificationComponent,
      { code: error.code, message: error.message }, 2000, 'top', 'end');
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
