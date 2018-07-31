import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from '../../../service/product/category.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { NotificationService } from '../../../service/popups/notification.service';
import { Subscription } from 'rxjs';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { FileUplaod } from '../../../models/common/file-upload/file-upload.model';
import { FileService } from '../../../service/file/file.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Constant } from '../../../utils/constant';

@Component({
  selector: 'app-form-creation-category',
  templateUrl: './form-creation-category.component.html',
  styleUrls: ['./form-creation-category.component.scss']
})
export class FormCreationCategoryComponent implements OnInit, OnDestroy {


  constructor(private categoryService: CategoryService, private notificationService: NotificationService, private fileService: FileService) { }

  private fgCategory: FormGroup;

  private name: FormControl;

  private description: FormControl;

  private imgCover;

  private arrFileUpload = [];

  /**
   * Subscription
   */
  private subscriptionCreateCategory: Subscription;

  private subscriptionUploadFile: Subscription;




  ngOnInit() {

    this.fgCategory = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        description: new FormControl('', [Validators.maxLength(500)])
      }
    )
  }

  removeImage() {
    console.log("remove image");
    this.imgCover = null;
    this.arrFileUpload = [];
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


  subFucntionNewCategory(newCategory) {
    this.subscriptionCreateCategory = this.categoryService.createCategory(newCategory).subscribe((entityRes: SuccessResponse<any>) => {
      this.notificationService.createNotification(
        NotificationComponent,
        { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end'
      );
    }, error => {
      this.notificationService.createNotification(
        NotificationComponent,
        { code: error.code, message: error.message }, 2000, 'top', 'end'
      );
    })
  }

  insertNewCategory() {
    if (this.fgCategory.valid) {
      let newCategoryObject = this.fgCategory.value;
      if (this.arrFileUpload && this.arrFileUpload.length > 0) {
        this.subscriptionUploadFile = this.fileService.uploadFile(this.arrFileUpload)
          .subscribe((entityRes: SuccessResponse<FileUplaod[]>) => {
            this.imgCover = `${Constant.SERVER_HOST}/${entityRes.value[0].path}`;
            this.subFucntionNewCategory(newCategoryObject);
          }, (httpError: HttpErrorResponse) => {
            this.handleError(httpError.error);
          })
      } else {
        this.subFucntionNewCategory(newCategoryObject);
      }
    } else {
      this.notificationService.createNotification(
        NotificationComponent,
        { code: 400, message: 'Dữ liệu không hợp lệ' }, 2000, 'top', 'end'
      );
    }
  }

  private handleError(error) {
    this.notificationService.createNotification(
      NotificationComponent,
      { code: error.code, message: error.message }, 2000, 'top', 'end'
    );
  }


  ngOnDestroy(): void {
    if (this.subscriptionCreateCategory) {
      this.subscriptionCreateCategory.unsubscribe();
    }
    if (this.subscriptionUploadFile) {
      this.subscriptionUploadFile.unsubscribe();
    }
  }
}
