import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../../models/product/category.model';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../service/product/category.service';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { SuccessResponse } from '../../../models/response/obj.success.res';

@Component({
  selector: 'app-form-edit-category',
  templateUrl: './form-edit-category.component.html',
  styleUrls: ['./form-edit-category.component.scss']
})
export class FormEditCategoryComponent implements OnInit, OnDestroy {

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private notificationService: NotificationService) { }

  private imgSource;

  private category: Category = new Category();

  private defaultDate = new Date();

  private defaultImageCover = "../../../../assets/Koala.jpg";

  private fgCategory: FormGroup;

  private _id: FormGroup;

  private name: FormControl;

  private description: FormControl;

  private subscriptionEditCategory: Subscription;


  ngOnInit() {

    this.getCategoryById();

    this.imgSource = this.category.imageCover;

    this.initFormGroup();

  }

  initFormGroup() {
    this.fgCategory = new FormGroup(
      {
        _id: new FormControl({ value: this.category._id, disabled: true }),
        name: new FormControl(this.category.name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        description: new FormControl(this.category.description, [Validators.maxLength(500)])
      }
    )
  }

  /**
   * get data
   */

  getCategoryById() {
    const _id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.category._id = _id;
  }

  removeImage() {
    console.log("remove image");
    this.imgSource = null;
  }


  fileChangeEvent(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(' ', fileInput.target.files, ' ', fileInput.target.files[0]);
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSource = e.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  /**
  * Get Error
  */
  getErrorFieldName() {
    if (this.fgCategory.controls.name.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgCategory.controls.name.hasError('maxlength') || this.fgCategory.controls.name.hasError('minlength')) {
      return 'Độ dài trong khoảng [4-50]'
    }
    return '';
  }

  getErrorFieldDescription() {
    if (this.fgCategory.controls.description.hasError('maxlength')) {
      return 'Độ dài trong khoảng [0-500]';
    }
    return '';
  }


  /**
   * action user
   */
  updateCategory() {
    if (this.fgCategory.valid) {
      let newCategoryObject = this.fgCategory.value;
      this.subscriptionEditCategory = this.categoryService.createCategory(newCategoryObject).subscribe((entityRes: SuccessResponse<any>) => {
        this.notificationService.createNotification(NotificationComponent, { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end');
      }, error => {
        this.notificationService.createNotification(NotificationComponent, { code: error.code, message: error.message }, 2000, 'top', 'end');
      })
    } else {
      this.notificationService.createNotification(NotificationComponent, { code: 400, message: 'Dữ liệu không hợp lệ ' }, 2000, 'top', 'end');
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionEditCategory){
      this.subscriptionEditCategory.unsubscribe();
    }
  }

}
