import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {


  public isMenuEmp: Boolean = false;

  public isMenuProduct: Boolean = false;

  public isMenuFile: Boolean = false;

  public isMenuCustomer: Boolean = false;

  constructor(private router: Router) { }



  ngOnInit() {
  }


  openMenuEmp() {
    this.isMenuEmp = !this.isMenuEmp;
  }

  openMenuProduct() {
    this.isMenuProduct = !this.isMenuProduct;
  }

  openMenuCustomer() {
    this.isMenuCustomer = !this.isMenuCustomer;
  }

  openMenuFile() {
    this.isMenuFile = !this.isMenuFile;
  }

  // open component

  openDashboardPage() {
    this.router.navigateByUrl('/dashboard');
  }

  openBannerImagePage() {
    this.router.navigateByUrl('/banner-image/list');
  }

  openEmployeePage() {
    this.router.navigateByUrl('/employee/list');
  }

  openRolePage() {
    this.router.navigateByUrl('/role');
  }

  openCategoryPage() {
    this.router.navigateByUrl('/category/list');
  }
  openProductPage() {
    this.router.navigateByUrl('/product/list');
  }
  openPromotionPage() {
    this.router.navigateByUrl('/promotion/list');
  }
}
