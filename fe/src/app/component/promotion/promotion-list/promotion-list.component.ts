import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion } from '../../../models/product/promotion.model';
import { Constant } from '../../../utils/constant';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {

  private pageNum: number = Constant.DEFAULT_PAGE_NUMBER;

  private pageSize: number = Constant.DEFAULT_PAGE_SIZE;

  private arrPromotion: Array<Promotion>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.arrPromotion = [
      {
        _id: "0001", name: "Mua 5 tặng 1", scope: "ALL_PRODUCT", type: "TOTAL_MONEY",
        minimumMoney: 500000, minimumQuantity: null, donatedProduct: null, reducedPercent: 5,
        appliedProduct: null, description: null, startedDate: null, endedDate: null, createdAt: null, updatedAt: null
      }
    ]
  }


  /**
   * call apo
   */

  getAllPromotion() {

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

  onChangePageSize(value) {
    console.log("value : ", value);
    this.pageSize = value;
    console.log("pageSize : ", this.pageSize);
  }
}
