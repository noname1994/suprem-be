import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee/employee.service';
import { NotificationService } from '../../service/popups/notification.service';
import { NotificationComponent } from '../../component/popups/notification/notification.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SuccessResponse } from '../../models/response/obj.success.res';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Constant } from '../../utils/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public fgLoginForm: FormGroup;

  public username: FormControl;

  public password: FormControl;

  public isLoading: boolean = false;

  constructor(private employeeService: EmployeeService, private notificationService: NotificationService, private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.username = new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]);
    this.password = new FormControl("", [Validators.required]);
    this.fgLoginForm = new FormGroup({
      username: this.username,
      password: this.password
    })
  }


  /**
   * Get Error
   */
  getErrorFieldUsername() {
    if (this.fgLoginForm.controls.username.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgLoginForm.controls.username.hasError('maxlength') || this.fgLoginForm.controls.username.hasError('minlength')) {
      return 'Độ dài trong khoảng [4-15]'
    }
    return '';
  }

  getErrorFieldPassword() {
    if (this.fgLoginForm.controls.password.hasError('required')) {
      return 'Trường này không được trống';
    }
    return '';
  }

  /**
   * action
   */
  private subcriptionLogin: Subscription;
  actionLogin() {
    if (this.fgLoginForm.valid) {
      this.isLoading = true;
      let body = this.fgLoginForm.value;
      this.subcriptionLogin = this.employeeService.login(body).subscribe((entityRes: SuccessResponse<any>) => {
        this.isLoading = false;
        console.log(entityRes.value);
        this.cookieService.set(Constant.TOKEN_NAME, entityRes.value);
        this.router.navigateByUrl("/");
      }, (httpError: HttpErrorResponse) => {
        this.isLoading = false;
        this.handleError(httpError.error);
      })
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

  ngOnDestroy(): void {
    if (this.subcriptionLogin) {
      this.subcriptionLogin.unsubscribe();
    }
  }

}
