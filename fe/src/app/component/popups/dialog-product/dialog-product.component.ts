import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../../models/product/product.model';
import { ProductService } from '../../../service/product/product.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { ArrayObject } from '../../../models/response/array.res';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.scss']
})
export class DialogProductComponent implements OnInit, OnDestroy {


  private arrProduct: Array<Product> = [];

  private params = { pageSize: 1000, pageNum: 0 };

  private subscriptionGetAllProduct: Subscription;

  private defaultImage = "../../../../assets/Koala.jpg";

  private arrIsSelect = [];

  constructor(private productService: ProductService, private dialogRef: MatDialogRef<DialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.getAllProduct();
  }

  /**
   * call API
   */
  getAllProduct() {
    this.subscriptionGetAllProduct = this.productService.getALlProduct(this.params).subscribe((entityRes: SuccessResponse<ArrayObject<Product[]>>) => {
      this.arrProduct = entityRes.value.list;
      this.arrIsSelect = new Array(entityRes.value.total).fill(false);
    }, (httpError: HttpErrorResponse) => {
      console.log("error: ", httpError);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnDestroy(): void {
    if (this.subscriptionGetAllProduct) {
      this.subscriptionGetAllProduct.unsubscribe();
    }
  }

  actionDialogClose() {
    let arrChoose = [];
    this.arrIsSelect.filter((element, i) => {
      if (element) {
        arrChoose.push(this.arrProduct[i]);
      }
    })
    this.dialogRef.close(arrChoose);
  }

  isChecked(i) {
    this.arrIsSelect[i] = !this.arrIsSelect[i];
    console.log(this.arrIsSelect);
  }

}
