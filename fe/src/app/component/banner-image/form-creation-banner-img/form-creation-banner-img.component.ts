import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileService } from '../../../service/file/file.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { FileUplaod } from '../../../models/common/file-upload/file-upload.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-creation-banner-img',
  templateUrl: './form-creation-banner-img.component.html',
  styleUrls: ['./form-creation-banner-img.component.scss']
})
export class FormCreationBannerImgComponent implements OnInit, OnDestroy {

  public isLoading = false;

  public arrFileUpload = [];

  public imageCover;

  private subcriptionUpload: Subscription;

  constructor(private fileService: FileService, private notificationService: NotificationService) { }

  ngOnInit() {
  }


  uploadBanner() {
    let type = "IMAGE_BANNER";
    if (this.arrFileUpload && this.arrFileUpload.length > 0) {
      this.isLoading = true;
      this.subcriptionUpload = this.fileService.uploadFile(this.arrFileUpload, type).subscribe((entityRes: SuccessResponse<FileUplaod[]>) => {
        this.isLoading = false;
        this.notificationService.createNotification(
          NotificationComponent,
          { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end'
        );
      }, (httpError: HttpErrorResponse) => {
        this.handleError(httpError.error);
      })
    } else {
      this.notificationService.createNotification(
        NotificationComponent,
        { code: 400, message: "Không có dữ liệu upload" }, 2000, 'top', 'end'
      );
    }

  }


  removeImage() {
    console.log("remove image");
    this.imageCover = null;
    this.arrFileUpload = [];
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

  private handleError(error) {
    this.isLoading = false;
    this.notificationService.createNotification(
      NotificationComponent,
      { code: error.code, message: error.message }, 2000, 'top', 'end'
    );
  }

  ngOnDestroy(): void {
    if (this.subcriptionUpload) {
      this.subcriptionUpload.unsubscribe();
    }
  }
}
