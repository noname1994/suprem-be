import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
import { FileService } from '../../../service/file/file.service';
import { Constant } from '../../../utils/constant';
import { FileUplaod } from '../../../models/common/file-upload/file-upload.model';

@Component({
  selector: 'app-form-creation-product',
  templateUrl: './form-creation-product.component.html',
  styleUrls: ['./form-creation-product.component.scss']
})
export class FormCreationProductComponent implements OnInit, OnDestroy {

  private isLoading: boolean = false;

  private imageCover;

  private product: Product = new Product();

  private arrColorImage: Array<ColorImage> = [];

  private fgProduct: FormGroup;

  private name: FormControl;

  private category: FormControl;

  private originalPrice: FormControl;

  private salePrice: FormControl;

  private material: FormControl;

  private provider: FormControl;

  private madeIn: FormControl;

  private description: FormControl;

  private arrImage = [];

  private arrFileUpload = [];

  private arrCategory: Category[] = [];

  private selectedCategory = "Không có dữ liệu";


  @ViewChild('f') myForm;

  /**
   * Subcription
   */
  private subcriptionGetAllCategory: Subscription;

  constructor(private categoetService: CategoryService, private productService: ProductService, private notificationService: NotificationService,
    private _fb: FormBuilder, private fileService: FileService) { }

  ngOnInit() {
    this.initFormGroup();
    this.getAllCategory();
  }

  initFormGroup() {
    this.name = new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]);
    this.originalPrice = new FormControl("", [Validators.required, Validators.min(1000)]);
    this.salePrice = new FormControl("", [Validators.min(1000)]);
    this.category = new FormControl("");
    this.material = new FormControl("", [Validators.maxLength(100)]);
    this.provider = new FormControl("", [Validators.maxLength(100)]);
    this.madeIn = new FormControl("", [Validators.maxLength(100)]);
    this.description = new FormControl("", [Validators.maxLength(500)])
    this.fgProduct = new FormGroup({
      name: this.name,
      category: this.category,
      originalPrice: this.originalPrice,
      salePrice: this.salePrice,
      material: this.material,
      provider: this.provider,
      madeIn: this.madeIn,
      description: this.description
      // colorImage: new FormArray([this.initItemRows()])
    })
  }


  resetFormGroup() {
    this.myForm.resetForm();
    this.arrImage = [];
    this.arrFileUpload = [];
  }



  /**
   * error 
   */
  getErrorFieldName() {
    if (this.fgProduct.controls.name.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgProduct.controls.name.hasError('maxlength') || this.fgProduct.controls.name.hasError('minlength')) {
      return 'Độ dài trong khoảng [4-50]'
    }
    return '';
  }

  getErrorFieldOriginalPrice() {
    if (this.fgProduct.controls.originalPrice.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgProduct.controls.name.hasError('min')) {
      return 'Giá phải lớn hơn hoặc bằng 1000';
    }
    return '';
  }

  getErrorFieldSalePrice() {
    if (this.fgProduct.controls.name.hasError('min')) {
      return 'Giá phải lớn hơn hoặc bằng 1000';
    }
    return '';
  }

  getErrorFieldMaterial() {
    if (this.fgProduct.controls.material.hasError('maxlength')) {
      return 'Độ dài trong khoảng [0-100]';
    }
    return '';
  }

  getErrorFieldProvider() {
    if (this.fgProduct.controls.provider.hasError('maxlength')) {
      return 'Độ dài trong khoảng [0-100]';
    }
    return '';
  }

  getErrorFieldMadeIn() {
    if (this.fgProduct.controls.madeIn.hasError('maxlength')) {
      return 'Độ dài trong khoảng [0-100]';
    }
    return '';
  }

  getErrorFieldDescription() {
    if (this.fgProduct.controls.description.hasError('maxlength')) {
      return 'Độ dài trong khoảng [0-500]';
    }
    return '';
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
    console.log("arrFileUpload: ", this.arrFileUpload);
    console.log("arrColorImage: ", this.arrColorImage);
    console.log("remove image: ", index);
    this.imageCover = null;
    this.arrFileUpload.splice(index, 1);;
    this.arrImage.splice(index, 1);
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

  private subcriptionCreateProduct: Subscription;

  private subcriptionUploadFile: Subscription;

  subCreateProduct(newProduct) {
    this.subcriptionCreateProduct = this.productService.createProduct(newProduct).subscribe((entityRes: SuccessResponse<any>) => {
      this.isLoading = false;
      this.notificationService.createNotification(
        NotificationComponent,
        { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end');
      this.resetFormGroup();
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }

  insertNewProduct() {
    if (this.fgProduct.valid) {
      this.isLoading = true;
      let newProduct = this.fgProduct.value;
      console.log("category : ", newProduct.category);
      console.log("newProduct :", newProduct);
      if (this.arrFileUpload && this.arrFileUpload.length > 0) {
        this.subcriptionUploadFile = this.fileService.uploadFile(this.arrFileUpload).subscribe((entityRes: SuccessResponse<FileUplaod[]>) => {
          let imageCover = [];
          entityRes.value.forEach(ele => {
            imageCover.push(`${Constant.SERVER_HOST}${ele.path}`);
          })
          newProduct.imageCover = imageCover;
          this.subCreateProduct(newProduct);
        }, (httpError: HttpErrorResponse) => {
          this.handleError(httpError.error);
        })
      } else {
        this.subCreateProduct(newProduct);
      }
    }
  }


  fileChangeEvent(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const files = fileInput.target.files;
      Object.keys(files).forEach(i => {
        if (Number(i) < 6 && this.arrImage.length < 6) {
          const file = files[i];
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.arrFileUpload.push(file);
            this.arrImage.push(e.target.result);
          }
          reader.readAsDataURL(file);
        }
      })
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
    if (this.subcriptionGetAllCategory) {
      this.subcriptionGetAllCategory.unsubscribe();
    }
    if (this.subcriptionCreateProduct){
      this.subcriptionCreateProduct.unsubscribe();
    }
    if (this.subcriptionUploadFile){
      this.subcriptionUploadFile.unsubscribe();
    }
  }
}
