import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../models/product/category.model';
import { Product } from '../../../models/product/product.model';
import { ColorImage } from '../../../models/product/color-image.model';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../service/product/category.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { ArrayObject } from '../../../models/response/array.res';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../../service/product/product.service';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-creation-product',
  templateUrl: './form-creation-product.component.html',
  styleUrls: ['./form-creation-product.component.scss']
})
export class FormCreationProductComponent implements OnInit, OnDestroy {


  private imageCover;

  private product: Product = new Product();

  private arrColorImage: Array<ColorImage> = [];

  private fgProduct: FormGroup;

  private name: FormControl;

  private category: FormControl;

  private originalPrice: FormControl;

  private salePrice: FormControl;


  private arrImageCover = [];

  private arrCategory: Category[] = [];

  private selectedCategory = "Không có dữ liệu";

  private arrFileUpload = [];


  /**
   * Subcription
   */
  private subcriptionGetAllCategory: Subscription;

  constructor(private categoetService: CategoryService, private productService: ProductService, private notificationService: NotificationService,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.initFormGroup();
    this.getAllCategory();
  }

  initFormGroup() {
    this.name = new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(4)]);
    this.originalPrice = new FormControl("", [Validators.required, Validators.min(1000)]);
    this.salePrice = new FormControl("", [Validators.min(1000)]);
    this.category = new FormControl("", [Validators.required]);
    this.fgProduct = new FormGroup({
      name: this.name,
      category: this.category,
      originalPrice: this.originalPrice,
      salePrice: this.salePrice,
      colorImage: new FormArray([this.initItemRows()])
    })
  }

  initItemRows() {
    return this._fb.group({
      // list all your form controls here, which belongs to your form array
      itemname: ['']
    });
  }

  addNewRow() {
    // control refers to your formarray
    const control = <FormArray>this.fgProduct.controls['colorImage'];
    // add new formgroup
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.fgProduct.controls['colorImage'];
    // remove the chosen row
    control.removeAt(index);
  }


  removeImage(index) {
    console.log("remove image");
    this.imageCover = null;
    this.arrFileUpload.splice(index, 1);;
    this.arrColorImage.splice(index, 1);
  }
  /**
   * call APi
   */
  getAllCategory() {
    this.subcriptionGetAllCategory = this.categoetService.getALlCategory({ pageNum: 0, pageSize: 1000 })
      .subscribe((entityRes: SuccessResponse<ArrayObject<Category[]>>) => {
        this.arrCategory = entityRes.value.list;
      }, (httpError: HttpErrorResponse) => {
        this.handleError(httpError.error);
      })
  }


  fileChangeEvent(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(' file : ', fileInput.target.files, ' ', fileInput.target.files[0]);
      this.arrFileUpload = Array.prototype.slice.call(fileInput.target.files);
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.arrColorImage.push(e.target.result);
      }
      reader.readAsDataURL(fileInput.target.files[0]);
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



  ngOnDestroy(): void {
    if (this.subcriptionGetAllCategory) {
      this.subcriptionGetAllCategory.unsubscribe();
    }
  }
}
