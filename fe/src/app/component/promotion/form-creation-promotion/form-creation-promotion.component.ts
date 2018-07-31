import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-creation-promotion',
  templateUrl: './form-creation-promotion.component.html',
  styleUrls: ['./form-creation-promotion.component.scss']
})
export class FormCreationPromotionComponent implements OnInit {


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

  private arrProduct = ["product 1", "product 2"];

  private defaultSelectd = "Không có dữ liệu";

  private arrAppliedProduct = ["Sản Phẩm 1", "Sản Phẩm 2", "Sản Phẩm 1", "Sản Phẩm 2", "Sản Phẩm 1", "Sản Phẩm 2"];

  private isAppliedProduct: Boolean = false;

  private isAppliedTotalMoney: Boolean = true;

  private imgCover;

  private arrFileUpload = [];

  constructor() { }

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
        this.imgCover = e.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }


  removeImage() {
    console.log("remove image");
    this.imgCover = null;
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

  subFunctionInsertPromotion() {

  }

  insertNewPromotion() {
    if (this.fgPromotion.valid) {
      let newPromotionObject = this.fgPromotion.value;

    } else {

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

}
