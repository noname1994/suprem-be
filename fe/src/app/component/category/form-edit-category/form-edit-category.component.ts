import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../../models/product/category.model';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { CategoryService } from '../../../service/product/category.service';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { ErrorResponse } from '../../../models/response/obj.error.res';
import { FileService } from '../../../service/file/file.service';
import { FileUplaod } from '../../../models/common/file-upload/file-upload.model';
import { Constant } from '../../../utils/constant';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-edit-category',
  templateUrl: './form-edit-category.component.html',
  styleUrls: ['./form-edit-category.component.scss']
})
export class FormEditCategoryComponent implements OnInit, OnDestroy {

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService,
    private notificationService: NotificationService, private fileSerive: FileService) { }

  private isLoading: boolean = false;

  private category: Category = new Category();

  private defaultDate = new Date();

  private defaultImageCover = "../../../../assets/Koala.jpg";

  private fgCategory: FormGroup;

  private _id: FormGroup;

  private name: FormControl;

  private description: FormControl;

  private imageCover;

  private arrFileUpload = [];

  private subscriptionEditCategory: Subscription;

  private subscriptionGetCategory: Subscription;

  private subscriptionUploadFile: Subscription;


  ngOnInit() {

    this.initFormGroup();

    this.getCategoryById();

  }

  initFormGroup() {
    this.fgCategory = new FormGroup(
      {
        _id: new FormControl(""),
        name: new FormControl(this.category.name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        description: new FormControl(this.category.description, [Validators.maxLength(500)])
      }
    )
  }

  setValueFormGroup(category) {
    this.fgCategory.controls._id.setValue(category._id);
    this.fgCategory.controls.name.setValue(category.name);
    this.fgCategory.controls.description.setValue(category.description);
    this.imageCover = category.imageCover;
  }


  /**
   * call Api
   */

  getCategoryById() {
    const _id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.isLoading = true;
    this.subscriptionGetCategory = this.categoryService.getCategoryById(_id).subscribe((entityRes: SuccessResponse<Category>) => {
      this.isLoading = false;
      this.category = entityRes.value;
      this.setValueFormGroup(this.category);
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }
  removeImage() {
    console.log("remove image");
    this.imageCover = null;
    this.arrFileUpload = [];
  }


  fileChangeEvent(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(' ', fileInput.target.files, ' ', fileInput.target.files[0]);
      this.arrFileUpload = Array.prototype.slice.call(fileInput.target.files);
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageCover = e.target.result;
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


  subUpdateCategory(newCategory) {
    this.subscriptionEditCategory = this.categoryService.updateCategory(newCategory)
      .subscribe((entityRes: SuccessResponse<any>) => {
        this.isLoading = false;
        this.notificationService.createNotification(
          NotificationComponent,
          { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end');
      }, (httpError: HttpErrorResponse) => {
        this.handleError(httpError.error);
      })
  }


  /**
   * action user
   */
  updateCategory() {
    if (this.fgCategory.valid) {
      this.isLoading = true;
      let newCategoryObject = this.fgCategory.value;
      if (this.arrFileUpload && this.arrFileUpload.length > 0) {
        this.subscriptionUploadFile = this.fileSerive.uploadFile(this.arrFileUpload)
          .subscribe((entityRes: SuccessResponse<FileUplaod[]>) => {
            this.imageCover = `${Constant.SERVER_HOST}${entityRes.value[0].path}`;
            newCategoryObject.imageCover = this.imageCover;
            this.subUpdateCategory(newCategoryObject);
          }, (httpError: HttpErrorResponse) => {
            this.handleError(httpError.error);
          })
      } else {
        this.subUpdateCategory(newCategoryObject);
      }
    } else {
      this.notificationService.createNotification(NotificationComponent, { code: 400, message: 'Dữ liệu không hợp lệ ' }, 2000, 'top', 'end');
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptionEditCategory) {
      this.subscriptionEditCategory.unsubscribe();
    }

    if (this.subscriptionGetCategory) {
      this.subscriptionGetCategory.unsubscribe();
    }

    if (this.subscriptionUploadFile) {
      this.subscriptionUploadFile.unsubscribe();
    }
  }


  private handleError(error) {
    this.isLoading = false;
    this.notificationService.createNotification(
      NotificationComponent,
      { code: error.code, message: error.message }, 2000, 'top', 'end');
  }

}
