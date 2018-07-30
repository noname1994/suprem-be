import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from '../../../utils/constant';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private pageNum: number = Constant.DEFAULT_PAGE_NUMBER;

  private pageSize: number = Constant.DEFAULT_PAGE_SIZE;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openFormCreationProduct() {
    this.router.navigateByUrl("/product/create");
  }



  onChangePageSize(value) {
    console.log("value : ", value);
    this.pageSize = value;
    console.log("pageSize : ", this.pageSize);
  }

}
