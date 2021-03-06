import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from '../../../utils/constant';
import { Product } from '../../../models/product/product.model';
import { ProductService } from '../../../service/product/product.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { ArrayObject } from '../../../models/response/array.res';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../service/popups/dialog..service';
import { DialogConfirmComponent } from '../../popups/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;

  public arrProduct: Array<Product> = [];

  private pageNum: number = Constant.DEFAULT_PAGE_NUMBER;

  private pageSize: number = Constant.DEFAULT_PAGE_SIZE;

  private params = { pageSize: this.pageSize, pageNum: this.pageNum };

  public totalRecord = 0;

  public positionIndexPageCliced: number = 0;

  public arrSelectedIndexPage: Array<boolean> = [];

  public arrIndexPage: Array<number> = [];

  /**
   * Subscription
   */
  private subcriptionGetAllProduct: Subscription;

  private subcriptionDeleteProduct: Subscription;

  constructor(private router: Router, private productService: ProductService, private dialogService: DialogService,
    private notificationService: NotificationService) { }

  ngOnInit() {

    this.getALlProduct();
  }

  openFormCreationProduct() {
    this.router.navigateByUrl("/product/create");
  }

  private subcriptionDialog: Subscription;
  deleteProduct(_id) {
    const dialogRef = this.dialogService.createDialog(DialogConfirmComponent, null, '300', '200');
    this.subcriptionDialog = dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data.confirm) {
        this.isLoading = true;
        let arrId = [_id];
        this.subcriptionDeleteProduct = this.productService.deleteProduct(arrId).subscribe((entityRes: SuccessResponse<any>) => {
          this.notificationService.createNotification(
            NotificationComponent,
            { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end');
          this.getALlProduct();
        }, (httpError: HttpErrorResponse) => {
          this.handleError(httpError.error);
        })
      }
    })
  }

  /**
   * call api
   */

  getALlProduct() {
    this.isLoading = true;
    this.subcriptionGetAllProduct = this.productService.getALlProduct(this.params).subscribe((entityRes: SuccessResponse<ArrayObject<Product[]>>) => {
      this.isLoading = false;
      this.arrProduct = entityRes.value.list;
      this.totalRecord = entityRes.value.total;
      this.setupPagination();
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }


  /**
   * pagination
   */

  setupPagination() {

    this.arrIndexPage = [];
    this.arrSelectedIndexPage = [];
    let numberPage = this.totalRecord / this.pageSize;

    console.log("numberPage : ", numberPage);

    for (let i = 0; i < numberPage; i++) {
      this.arrIndexPage.push(i);
      this.arrSelectedIndexPage.push(false);
    }
    this.arrSelectedIndexPage[this.positionIndexPageCliced] = true;
    console.log(this.arrIndexPage)
  }



  onChangePageSize(value) {
    this.pageSize = value;
    this.params.pageSize = this.pageSize;
    this.positionIndexPageCliced = 0;
    this.getALlProduct();
  }

  changePageNum(index) {
    this.pageNum = index;
    this.params.pageNum = this.pageNum;
  }

  preIndexPageClicked() {
    if (this.positionIndexPageCliced > 0) {
      this.arrSelectedIndexPage[this.positionIndexPageCliced] = false;
      this.arrSelectedIndexPage[this.positionIndexPageCliced - 1] = true;
      this.positionIndexPageCliced = this.positionIndexPageCliced - 1;
      this.changePageNum(this.positionIndexPageCliced);
      this.getALlProduct();
    }
  }


  IndexPageClicked(index) {
    if (index != this.positionIndexPageCliced) {
      this.arrSelectedIndexPage[this.positionIndexPageCliced] = false;
      this.arrSelectedIndexPage[index] = true;
      this.positionIndexPageCliced = index;
      this.changePageNum(index);
      this.getALlProduct();
    }
  }

  lastIndexPageClicked() {
    if (this.positionIndexPageCliced < this.arrIndexPage.length - 1) {
      this.arrSelectedIndexPage[this.positionIndexPageCliced] = false;
      this.arrSelectedIndexPage[this.positionIndexPageCliced + 1] = true;
      this.positionIndexPageCliced = this.positionIndexPageCliced + 1;
      this.changePageNum(this.positionIndexPageCliced);
      this.getALlProduct();
    }
  }

  /**
   * action
   */
  actionOpenFormEditProduct(_id) {
    this.router.navigateByUrl('/product/edit/' + _id);
  }

  /**
  * handle error
  */
  private handleError(error) {
    this.isLoading = false;
    this.notificationService.createNotification(
      NotificationComponent,
      { code: error.code, message: error.message }, 2000, 'top', 'end');
  }



  ngOnDestroy(): void {
    if (this.subcriptionGetAllProduct) {
      this.subcriptionGetAllProduct.unsubscribe();
    }
    if (this.subcriptionDialog) {
      this.subcriptionDialog.unsubscribe();
    }
    if (this.subcriptionDeleteProduct) {
      this.subcriptionDeleteProduct.unsubscribe();
    }
  }

}
