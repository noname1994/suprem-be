import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PromotionService } from '../../../service/product/promotion.service';
import { NotificationService } from '../../../service/popups/notification.service';
import { FileService } from '../../../service/file/file.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { Promotion } from '../../../models/product/promotion.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { Subscription, Observable } from 'rxjs';
import { FileUplaod } from '../../../models/common/file-upload/file-upload.model';
import { Constant } from '../../../utils/constant';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogProductComponent } from '../../popups/dialog-product/dialog-product.component';
import { DialogService } from '../../../service/popups/dialog..service';

@Component({
  selector: 'app-form-creation-promotion',
  templateUrl: './form-creation-promotion.component.html',
  styleUrls: ['./form-creation-promotion.component.scss']
})
export class FormCreationPromotionComponent implements OnInit, OnDestroy {

  private fgPromotion: FormGroup;

  private name: FormControl;

  private scope: FormControl;

  private type: FormControl;

  private minimumMoney: FormControl;

  private minimumQuantity: FormControl;

  private donatedProduct: FormControl;

  private reducedPercent: FormControl;

  private description: FormControl;

  private startedDate: FormControl;

  private endedDate: FormControl;

  private arrScope = ["ALL_PRODUCT", "SPECIAL_PRODUCT"];

  private arrType = ["TOTAL_MONEY", "PURCHASED_QUANTITY"];

  private arrProduct = [];

  private defaultSelectd = "Không có dữ liệu";

  private arrAppliedProduct = [];

  private isAppliedProduct: Boolean = false;

  private isAppliedTotalMoney: Boolean = true;

  private imageCover;

  private arrFileUpload = [];

  private subscriptionUploadFile: Subscription;

  private subscriptionInsertPromotion: Subscription;

  private arrDonatedProduct = [];

  constructor(private promotionService: PromotionService, private notificationService: NotificationService,
    private fileService: FileService, private dialogService: DialogService) { }

  ngOnInit() {

    this.fgPromotion = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      scope: new FormControl('ALL_PRODUCT', [Validators.required]),
      type: new FormControl('TOTAL_MONEY', [Validators.required]),
      minimumMoney: new FormControl('', [Validators.min(1000)]),
      minimumQuantity: new FormControl('', [Validators.min(1)]),
      donatedProduct: new FormControl(''),
      reducedPercent: new FormControl('', [Validators.min(1), Validators.max(100)]),
      description: new FormControl('', [Validators.maxLength(500)]),
      startedDate: new FormControl('', [Validators.required]),
      endedDate: new FormControl('', [Validators.required]),
    })

  }


  fileChangeEvent(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.arrFileUpload = Array.prototype.slice.call(fileInput.target.files);
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageCover = e.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }


  removeImage() {
    console.log("remove image");
    this.imageCover = null;
    this.arrFileUpload = [];
  }



  /**
   * Get Error
   */
  getErrorFieldName() {
    if (this.fgPromotion.controls.name.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgPromotion.controls.name.hasError('maxlength') || this.fgPromotion.controls.name.hasError('minlength')) {
      return 'Độ dài trong khoảng [4-50]'
    }
    return '';
  }


  getErrorFieldScope() {
    if (this.fgPromotion.controls.scope.hasError('required')) {
      return 'Trường này không được trống';
    }
    return '';
  }

  getErrorFieldType() {
    if (this.fgPromotion.controls.scope.hasError('required')) {
      return 'Trường này không được trống';
    }
    return '';
  }

  getErrorMinimumMoney() {

    if (this.fgPromotion.controls.minimumMoney.hasError('min')) {
      return 'Tổng tiền phải là bội số của 1000';
    }
    return '';
  }

  getErrorMinimumQuantity() {
    if (this.fgPromotion.controls.minimumQuantity.hasError('min')) {
      return 'Số lượng sản phẩm phải >= 1';
    }
    return '';
  }

  getErrorReducedPercent() {
    if (this.fgPromotion.controls.reducedPercent.hasError('min') || this.fgPromotion.controls.reducedPercent.hasError('max')) {
      return 'Phần trăm giảm nằm trong khoảng [1 - 100]';
    }
    return '';
  }

  getErrorFieldStartedDate() {
    if (this.fgPromotion.controls.startedDate.hasError('required')) {
      return 'Trường này không được trống';
    }
    return '';
  }

  getErrorFieldEndedDate() {
    if (this.fgPromotion.controls.endedDate.hasError('required')) {
      return 'Trường này không được trống';
    }
    return ''
  }

  getErrorFieldDescription() {
    if (this.fgPromotion.controls.description.hasError('maxlength')) {
      return 'Độ dài trong khoảng [0-500]';
    }
    return '';
  }


  /**
   * Insert 
   */

  subFunctionInsertPromotion(newPromotion) {
    this.subscriptionInsertPromotion = this.promotionService.createPromotion(newPromotion).subscribe((entityRes: SuccessResponse<Promotion>) => {
      this.notificationService.createNotification(
        NotificationComponent,
        { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end');
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }

  insertNewPromotion() {
    if (this.fgPromotion.valid) {
      let newPromotionObject = this.fgPromotion.value;
      newPromotionObject.donatedProduct = this.arrDonatedProduct ? this.arrDonatedProduct.map(ele => {
        return ele._id;
      }) : [];
      newPromotionObject.appliedProduct = this.arrAppliedProduct ? this.arrAppliedProduct.map(ele => {
        return ele._id;
      }) : [];
      if (this.arrFileUpload && this.arrFileUpload.length > 0) {
        this.subscriptionUploadFile = this.fileService.uploadFile(this.arrFileUpload)
          .subscribe((entityRes: SuccessResponse<FileUplaod[]>) => {
            this.imageCover = `${Constant.SERVER_HOST}${entityRes.value[0].path}`;
            newPromotionObject.imageCover = this.imageCover;
            this.subFunctionInsertPromotion(newPromotionObject);
          }, (httpError: HttpErrorResponse) => {
            this.handleError(httpError.error);
          })
      } else {
        this.subFunctionInsertPromotion(newPromotionObject);
      }
    } else {
      this.notificationService.createNotification(
        NotificationComponent,
        { code: 400, message: "Form nhập chưa hợp lệ " }, 2000, 'top', 'end');
    }
  }

  /**
   * Selected
   */

  actionSelectedScope(value) {
    console.log("value : ", value);
    if (value == this.arrScope[0]) {
      this.isAppliedProduct = false;
    } else {
      this.isAppliedProduct = true;
    }
  }

  actionSelectedType(value) {
    if (value == this.arrType[0]) {
      this.isAppliedTotalMoney = true;
    } else {
      this.isAppliedTotalMoney = false;
    }
  }

  iconAddDonatedProductClicked() {
    const dialogRef = this.dialogService.createDialog(DialogProductComponent, { title: "Vui Lòng Lựa Chọn Sản Phẩm Tặng Kèm" }, '800px', '600px');
    dialogRef.afterClosed().subscribe(result => {
      this.arrDonatedProduct = result;
      console.log("arrDonatedProduct : ", this.arrDonatedProduct);
    });
  }

  iconAddAppliedProductClicked() {
    const dialogRef = this.dialogService.createDialog(DialogProductComponent, { title: "Vui Lòng Lựa Chọn Sản Phẩm Áp Dụng Khuyến Mại" }, '800px', '600px');
    dialogRef.afterClosed().subscribe(result => {
      this.arrAppliedProduct = result;
      console.log("arrAppliedProduct : ", this.arrAppliedProduct);
    });
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
    if (this.subscriptionInsertPromotion) {
      this.subscriptionInsertPromotion.unsubscribe();
    }

    if (this.subscriptionUploadFile) {
      this.subscriptionUploadFile.unsubscribe();
    }
  }

}


