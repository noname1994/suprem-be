import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion } from '../../../models/product/promotion.model';
import { Constant } from '../../../utils/constant';
import { PromotionService } from '../../../service/product/promotion.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { ArrayObject } from '../../../models/response/array.res';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { Subscription } from 'rxjs';
import { DialogConfirmComponent } from '../../popups/dialog-confirm/dialog-confirm.component';
import { DialogService } from '../../../service/popups/dialog..service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit, OnDestroy {


  private isLoading: boolean = false;

  private pageNum: number = Constant.DEFAULT_PAGE_NUMBER;

  private pageSize: number = Constant.DEFAULT_PAGE_SIZE;

  private params: any = { pageNum: this.pageNum, pageSize: this.pageSize };

  private totalRecord: number = 0;

  private arrPromotion: Array<Promotion>;

  private arrIndexPage: Array<Number> = [];

  private arrSelectedIndexPage: Array<Boolean> = [];

  private positionIndexPageCliced = 0;

  constructor(private router: Router, private promotionService: PromotionService, private notificationService: NotificationService,
    private dialogService: DialogService) { }

  ngOnInit() {

    this.getAllPromotion();


  }

  /**
   * setup
   */

  setupPagination() {

    this.arrIndexPage = [];
    this.arrSelectedIndexPage = [];
    let numberPage = this.totalRecord / this.pageSize;

    for (let i = 0; i < numberPage; i++) {
      this.arrIndexPage.push(i);
      this.arrSelectedIndexPage.push(false);
    }
    this.arrSelectedIndexPage[this.positionIndexPageCliced] = true;
    console.log(this.arrIndexPage)
  }

  /**
   * call api
   */

  private subcriptionGetAllPromotion: Subscription;
  getAllPromotion() {
    this.isLoading = true;
    this.subcriptionGetAllPromotion = this.promotionService.getALlPromotion(this.params).subscribe((entityRes: SuccessResponse<ArrayObject<Promotion[]>>) => {
      this.isLoading = false;
      this.arrPromotion = entityRes.value.list;
      this.totalRecord = entityRes.value.total;
      this.setupPagination();
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }

  /**
   * User action
   */

  openFormCreationPromotion() {
    this.router.navigateByUrl("/promotion/create");
  }

  actionOpenFormEditPromotion(_id) {
    this.router.navigateByUrl(`/promotion/edit/${_id}`);
  }

  private subcriptionDialog: Subscription;
  private subcriptionDeletePromotion: Subscription;
  deletePromotion(_id) {
    const dialogRef = this.dialogService.createDialog(DialogConfirmComponent, null, '300', '200');
    this.subcriptionDialog = dialogRef.afterClosed().subscribe((data: any) => {
      if (data && data.confirm) {
        this.isLoading = true;
        let arrId = [_id];
        this.subcriptionDeletePromotion = this.promotionService.deletePromotion(arrId).subscribe((entityRes: SuccessResponse<any>) => {
          this.notificationService.createNotification(
            NotificationComponent,
            { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end');
            this.getAllPromotion();
        }, (httpError: HttpErrorResponse) => {
          this.handleError(httpError.error);
        })
      }
    })
  }


  /**
   * 
   * pagination 
   */

  onChangePageSize(value) {
    this.pageSize = value;
    this.params.pageSize = this.pageSize;
    this.positionIndexPageCliced = 0;
    this.getAllPromotion();
  }

  changePageNum(index) {
    console.log("changePageNum : ", index);
    this.pageNum = index;
    this.params.pageNum = this.pageNum;
  }

  preIndexPageClicked() {
    if (this.positionIndexPageCliced > 0) {
      this.arrSelectedIndexPage[this.positionIndexPageCliced] = false;
      this.arrSelectedIndexPage[this.positionIndexPageCliced - 1] = true;
      this.positionIndexPageCliced = this.positionIndexPageCliced - 1;
      this.changePageNum(this.positionIndexPageCliced);
      this.getAllPromotion();
    }
  }


  IndexPageClicked(index) {
    if (index != this.positionIndexPageCliced) {
      this.arrSelectedIndexPage[this.positionIndexPageCliced] = false;
      this.arrSelectedIndexPage[index] = true;
      this.positionIndexPageCliced = index;
      this.changePageNum(index);
      this.getAllPromotion();
    }
  }

  lastIndexPageClicked() {
    if (this.positionIndexPageCliced < this.arrIndexPage.length - 1) {
      this.arrSelectedIndexPage[this.positionIndexPageCliced] = false;
      this.arrSelectedIndexPage[this.positionIndexPageCliced + 1] = true;
      this.positionIndexPageCliced = this.positionIndexPageCliced + 1;
      this.changePageNum(this.positionIndexPageCliced);
      this.getAllPromotion();
    }
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
    this.isLoading = false;
    if (this.subcriptionGetAllPromotion) {
      this.subcriptionGetAllPromotion.unsubscribe();
    }
    if (this.subcriptionDialog) {
      this.subcriptionDialog.unsubscribe();
    }
    if (this.subcriptionDeletePromotion) {
      this.subcriptionDeletePromotion.unsubscribe();
    }
  }
}
