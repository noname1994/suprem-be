import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion } from '../../../models/product/promotion.model';
import { Constant } from '../../../utils/constant';
import { PromotionService } from '../../../service/product/promotion.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { ArrayObject } from '../../../models/response/array.res';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {

  private pageNum: number = Constant.DEFAULT_PAGE_NUMBER;

  private pageSize: number = Constant.DEFAULT_PAGE_SIZE;

  private params: any = { pageNum: this.pageNum, pageSize: this.pageSize };

  private totalRecord: number = 0;

  private arrPromotion: Array<Promotion>;

  private arrIndexPage: Array<Number> = [];

  private arrSelectedIndexPage: Array<Boolean> = [];

  private positionIndexPageCliced = 0;

  constructor(private router: Router, private promotionService: PromotionService, private notificationService: NotificationService) { }

  ngOnInit() {

    this.getAllPromotion();


  }

  /**
   * setup
   */

  setupPagination() {
    let numberPage = Math.round(this.totalRecord / this.pageSize);

    console.log(this.totalRecord, ' - -', numberPage);

    if (this.totalRecord % this.pageSize != 0) {
      ++numberPage;
    }
    for (let i = 0; i < numberPage; i++) {
      this.arrIndexPage.push(i);
      this.arrSelectedIndexPage.push(false);
    }
    console.log(this.arrIndexPage)
  }

  /**
   * call api
   */

  getAllPromotion() {
    this.promotionService.getALlPromotion(this.params).subscribe((entityRes: SuccessResponse<ArrayObject<Promotion[]>>) => {
      this.arrPromotion = entityRes.value.list;
      this.totalRecord = entityRes.value.total;
      this.setupPagination();
      this.arrSelectedIndexPage[0] = true;
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


  /**
   * 
   * pagination 
   */

  onChangePageSize(value) {
    this.pageSize = value;
    this.params.pageSize = this.pageSize;
    this.getAllPromotion();
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
      this.changePageNum(this.positionIndexPageCliced - 1);
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
      this.changePageNum(this.positionIndexPageCliced + 1);
      this.getAllPromotion();
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
}
