import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Promotion } from '../../../models/product/promotion.model';
import { DialogProductComponent } from '../../popups/dialog-product/dialog-product.component';
import { DialogService } from '../../../service/popups/dialog..service';
import { Subscription } from 'rxjs';
import { PromotionService } from '../../../service/product/promotion.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { FileService } from '../../../service/file/file.service';
import { FileUplaod } from '../../../models/common/file-upload/file-upload.model';
import { Constant } from '../../../utils/constant';

@Component({
  selector: 'app-form-edit-promotion',
  templateUrl: './form-edit-promotion.component.html',
  styleUrls: ['./form-edit-promotion.component.scss']
})
export class FormEditPromotionComponent implements OnInit, OnDestroy {


  private promotion: Promotion = new Promotion();

  private fgPromotion: FormGroup;

  private _id: FormControl;

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

  private arrProduct = ["product 1", "product 2"];

  private defaultSelectd = "Không có dữ liệu";

  private arrAppliedProduct = [];

  private imageCover;

  private arrFileUpload = [];

  private arrDonatedProduct = [];

  private isAppliedProduct: Boolean = false;

  private isAppliedTotalMoney: Boolean = true;

  private subscriptionPromotionById: Subscription;

  private subscriptionDialog1: Subscription;

  private subscriptionDialog2: Subscription;

  private subscriptionUploadFile: Subscription;

  private subscriptionEditPromotion: Subscription;


  constructor(private activatedRoute: ActivatedRoute, private dialogService: DialogService, private promotionService: PromotionService,
    private notificationService: NotificationService, private fileService: FileService) { }

  ngOnInit() {

    this.fgPromotion = new FormGroup({
      _id: new FormControl({ value: '' }),
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      scope: new FormControl('ALL_PRODUCT', [Validators.required]),
      type: new FormControl('TOTAL_MONEY', [Validators.required]),
      minimumMoney: new FormControl('', [Validators.min(1000)]),
      minimumQuantity: new FormControl('', [Validators.min(1)]),
      reducedPercent: new FormControl('', [Validators.min(1), Validators.max(100)]),
      description: new FormControl('', [Validators.maxLength(500)]),
      startedDate: new FormControl('', [Validators.required]),
      endedDate: new FormControl('', [Validators.required]),
    })

    this.getCategoryById();
  }


  setValueFromGroup(promotion: Promotion) {
    this.fgPromotion.controls._id.setValue(promotion._id, { disabled: true });
    this.fgPromotion.controls.name.setValue(promotion.name);

    this.fgPromotion.controls.scope.setValue(promotion.scope);
    this.isAppliedProduct = promotion.scope == "SPECIAL_PRODUCT" ? true : false;
    this.fgPromotion.controls.type.setValue(promotion.type);
    this.isAppliedTotalMoney = promotion.type == "TOTAL_MONEY" ? true : false;
    this.fgPromotion.controls.minimumMoney.setValue(promotion.minimumMoney);
    this.fgPromotion.controls.minimumQuantity.setValue(promotion.minimumQuantity);
    this.fgPromotion.controls.reducedPercent.setValue(promotion.reducedPercent);
    this.fgPromotion.controls.description.setValue(promotion.description);
    this.fgPromotion.controls.startedDate.setValue(promotion.startedDate);
    this.fgPromotion.controls.endedDate.setValue(promotion.endedDate);
    this.arrAppliedProduct = promotion.appliedProduct || [];
    this.arrDonatedProduct = promotion.donatedProduct || [];
    this.imageCover = promotion.imageCover;
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
   * call api
   */

  getCategoryById() {
    const _id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.subscriptionPromotionById = this.promotionService.getPromotionById(_id).subscribe((entityRes: SuccessResponse<Promotion>) => {
      this.promotion = entityRes.value;
      this.setValueFromGroup(this.promotion);
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
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
    this.subscriptionEditPromotion = this.promotionService.updatePromotion(newPromotion).subscribe((entityRes: SuccessResponse<Promotion>) => {
      this.promotion = entityRes.value;
      this.notificationService.createNotification(
        NotificationComponent,
        { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end');
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }

  editPromotion() {
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
    this.subscriptionDialog1 = dialogRef.afterClosed().subscribe(result => {
      this.arrDonatedProduct = result;
      console.log("arrDonatedProduct : ", this.arrDonatedProduct);
    });
  }


  iconAddAppliedProductClicked() {
    const dialogRef = this.dialogService.createDialog(DialogProductComponent, { title: "Vui Lòng Lựa Chọn Sản Phẩm Áp Dụng Khuyến Mại" }, '800px', '600px');
    this.subscriptionDialog2 = dialogRef.afterClosed().subscribe(result => {
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
    if (this.subscriptionDialog1) {
      this.subscriptionDialog1.unsubscribe();
    }

    if (this.subscriptionDialog2) {
      this.subscriptionDialog2.unsubscribe();
    }

    if (this.subscriptionPromotionById) {
      this.subscriptionPromotionById.unsubscribe();
    }

    if (this.subscriptionEditPromotion) {
      this.subscriptionEditPromotion.unsubscribe();
    }

    if (this.subscriptionUploadFile) {
      this.subscriptionUploadFile.unsubscribe();
    }
  }
}
