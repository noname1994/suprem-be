import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../service/employee/role.service';
import { SuccessResponse } from '../../models/response/obj.success.res';
import { Role } from '../../models/employee/role.model';
import { throwError, Subscription } from 'rxjs';
import { NotificationService } from '../../service/popups/notification.service';
import { NotificationComponent } from '../popups/notification/notification.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy {


  private subscriptionGetAllRole: Subscription;

  private arrRole: Array<Role> = [];

  constructor(private roleService: RoleService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllRole();
  }

  getAllRole() {
    this.subscriptionGetAllRole = this.roleService.getAllRole().subscribe((entityRes: SuccessResponse<Array<Role>>) => {
      this.arrRole = entityRes.value;
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }

  ngOnDestroy(): void {
    if (this.subscriptionGetAllRole) {
      this.subscriptionGetAllRole.unsubscribe();
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

}
