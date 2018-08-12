import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../../../service/file/file.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { FileUplaod } from '../../../models/common/file-upload/file-upload.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { Subscription } from 'rxjs';
import { ArrayObject } from '../../../models/response/array.res';
import { Constant } from '../../../utils/constant';

@Component({
  selector: 'app-banner-image-list',
  templateUrl: './banner-image-list.component.html',
  styleUrls: ['./banner-image-list.component.scss']
})
export class BannerImageListComponent implements OnInit {

  public isLoading = false;

  public totalRecord = 0;

  private subcriptionGetALl: Subscription;

  private subcriptionUpdate: Subscription;

  public arrBanner = [];

  public host = Constant.SERVER_HOST;

  constructor(private router: Router, private fileService: FileService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllFileUpload();
  }


  openFormCreationBannerImg() {
    this.router.navigateByUrl("/banner-image/create");
  }

  getAllFileUpload() {
    this.isLoading = true;
    this.subcriptionGetALl = this.fileService.getAllBanner().subscribe((entityRes: SuccessResponse<ArrayObject<FileUplaod[]>>) => {
      this.isLoading = true;
      this.arrBanner = entityRes.value.list;
      this.totalRecord = entityRes.value.total;
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }
  private handleError(error) {
    this.isLoading = false;
    this.notificationService.createNotification(
      NotificationComponent,
      { code: error.code, message: error.message }, 2000, 'top', 'end'
    );
  }

  ngOnDestroy(): void {
    if (this.subcriptionGetALl) {
      this.subcriptionGetALl.unsubscribe();
    }
    if (this.subcriptionUpdate) {
      this.subcriptionUpdate.unsubscribe();
    }
  }

  updateBannerStatus(_id) {
    this.isLoading = true;
    let status = "SHOW";
    this.subcriptionUpdate = this.fileService.updateBannerStatus(_id, status).subscribe((entityRes: SuccessResponse<any>) => {
      this.isLoading = false;
      this.notificationService.createNotification(
        NotificationComponent,
        { code: entityRes.code, message: entityRes.message }, 2000, 'top', 'end'
      );
      this.getAllFileUpload();
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }

  deleteBanner(_id) {

  }
}
