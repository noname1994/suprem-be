import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Ward } from '../../../models/common/address/ward.model';
import { Province } from '../../../models/common/address/province.model';
import { District } from '../../../models/common/address/district.model';
import { Role } from '../../../models/employee/role.model';
import { RoleService } from '../../../service/employee/role.service';
import { EmployeeService } from '../../../service/employee/employee.service';
import { NotificationService } from '../../../service/popups/notification.service';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { VNLocationService } from '../../../service/vn-location/vn-location.service';
import { Subscription } from 'rxjs';
import { Employee } from '../../../models/employee/employee.model';

@Component({
  selector: 'app-form-creation-emp',
  templateUrl: './form-creation-emp.component.html',
  styleUrls: ['./form-creation-emp.component.scss']
})
export class FormCreationEmpComponent implements OnInit, OnDestroy {


  arrProvince: Province[] = []

  arrDistrict: District[] = []

  arrWard: Ward[] = [];

  arrRole: Role[] = [];

  private fgEmployee: FormGroup;

  private fullname: FormControl;

  private gen: FormControl;

  private email: FormControl;

  private address: FormGroup;

  private detail: FormControl;

  private province: FormControl;

  private district: FormControl;

  private ward: FormControl;

  private username: FormControl;

  private facebookPage: FormControl;

  private phoneNumber: FormControl;

  // private avatar: FormControl;

  private role: FormControl;

  private salary: FormGroup;

  private baseSalary: FormControl;

  private positionSalary: FormControl;

  private allowanceSalary: FormControl;

  private dateWorking: FormControl;

  private subcriptionGetAllDistrict: Subscription;

  private subcriptionGetAllWard: Subscription;

  private subcriptionGetAllRole: Subscription;

  private subcriptionGetAllProvince: Subscription;

  private subcriptionCreateProduct: Subscription;

  @ViewChild('f') myForm;

  constructor(private roleService: RoleService, private employeeService: EmployeeService,
    private notificationService: NotificationService, private vnLocationService: VNLocationService) { }

  ngOnInit() {
    this.initFormGroup();
    this.getAllRole();
    this.getAllProvince();
  }


  initFormGroup() {
    this.fullname = new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]);
    this.gen = new FormControl("", [Validators.required, Validators.maxLength(12), Validators.minLength(9)]);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.username = new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(4)]);
    this.fullname = new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]);
    this.role = new FormControl("", [Validators.required]);
    this.dateWorking = new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]);
    this.phoneNumber = new FormControl("", [Validators.required]);
    this.facebookPage = new FormControl("");

    this.detail = new FormControl("");
    this.ward = new FormControl("");
    this.district = new FormControl("");
    this.province = new FormControl("");
    this.address = new FormGroup({
      detail: this.detail,
      ward: this.ward,
      district: this.district,
      province: this.province
    })

    this.baseSalary = new FormControl("", [Validators.required, Validators.min(1000)]);
    this.positionSalary = new FormControl("", [Validators.min(1000)]);
    this.allowanceSalary = new FormControl("", [Validators.min(1000)]);
    this.salary = new FormGroup({
      baseSalary: this.baseSalary,
      positionSalary: this.positionSalary,
      allowanceSalary: this.allowanceSalary
    })

    this.fgEmployee = new FormGroup({
      fullname: this.fullname,
      gen: this.gen,
      email: this.email,
      username: this.username,
      role: this.role,
      phoneNumber: this.phoneNumber,
      facebookPage: this.facebookPage,
      dateWorking: this.dateWorking,
      address: this.address,
      salary: this.salary
    })
  }

  resetFormGroup() {
    this.myForm.resetForm();
  }


  /**
   * Error
   */
  getErrorFieldFullname() {
    if (this.fgEmployee.controls.fullname.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgEmployee.controls.fullname.hasError('maxlength') || this.fgEmployee.controls.fullname.hasError('minlength')) {
      return 'Độ dài trong khoảng [3-50]'
    }
    return '';
  }

  getErrorFieldGen() {
    if (this.fgEmployee.controls.gen.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgEmployee.controls.gen.hasError('maxlength') || this.fgEmployee.controls.gen.hasError('minlength')) {
      return 'Độ dài trong khoảng [9-12]'
    }
    return '';
  }

  getErrorFieldEmail() {
    if (this.fgEmployee.controls.email.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgEmployee.controls.email.hasError('email')) {
      return 'Phải là định dạng email'
    }
    return '';
  }

  getErrorFieldUsername() {
    if (this.fgEmployee.controls.username.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgEmployee.controls.username.hasError('maxlength') || this.fgEmployee.controls.username.hasError('minlength')) {
      return 'Độ dài trong khoảng [4-15]'
    }
    return '';
  }

  getErrorFieldPhoneNumber() {
    if (this.fgEmployee.controls.phoneNumber.hasError('required')) {
      return 'Trường này không được trống';
    }
    return '';
  }

  getErrorFieldBaseSalary() {
    if (this.fgEmployee.controls.salary.get("baseSalary").hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgEmployee.controls.salary.get("baseSalary").hasError('min')) {
      return 'Giá trị lớn hơn 1000'
    }
    return '';
  }

  getErrorFieldPositionSalary() {
    if (this.fgEmployee.controls.salary.get("positionSalary").hasError('min')) {
      return 'Giá trị lớn hơn 1000'
    }
    return '';
  }

  getErrorFieldAllowanceSalary() {
    if (this.fgEmployee.controls.salary.get("allowanceSalary").hasError('min')) {
      return 'Giá trị lớn hơn 1000'
    }
    return '';
  }

  /**
   * call api
   */



  getAllRole() {
    this.subcriptionGetAllRole = this.roleService.getAllRole().subscribe((entityRes: SuccessResponse<Role[]>) => {
      this.arrRole = entityRes.value;
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }

  getAllProvince() {
    this.subcriptionGetAllProvince = this.vnLocationService.getAllProvince().subscribe((entityRes: SuccessResponse<Province[]>) => {
      this.arrProvince = entityRes.value;
    }, (httpError: HttpErrorResponse) => {
      this.handleError(httpError.error);
    })
  }

  /**
   * action
   */
  actionInsertEmployee() {
    if (this.fgEmployee.valid) {
      let newEmployee = this.fgEmployee.value;
      this.subcriptionCreateProduct = this.employeeService.createEmployee(newEmployee).subscribe((resEntity: SuccessResponse<Employee>) => {
        this.notificationService.createNotification(
          NotificationComponent,
          { code: resEntity.code, message: resEntity.message }, 2000, 'top', 'end');
        this.resetFormGroup();
      }, (httpError: HttpErrorResponse) => {
        this.handleError(httpError.error);
      })
    }
  }


  provinceChange(province: Province) {
    this.subcriptionGetAllDistrict = this.vnLocationService.getAllDistrictByProvince(province._id)
      .subscribe((entityRes: SuccessResponse<District[]>) => {
        this.arrDistrict = entityRes.value;
      }, (httpError: HttpErrorResponse) => {
        this.handleError(httpError.error);
      })
  }

  districtChange(district: District) {
    this.subcriptionGetAllDistrict = this.vnLocationService.getALlWardByDistrict(district._id)
      .subscribe((entityRes: SuccessResponse<Ward[]>) => {
        this.arrWard = entityRes.value;
      }, (httpError: HttpErrorResponse) => {
        this.handleError(httpError.error);
      })
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
    if (this.subcriptionGetAllProvince) {
      this.subcriptionGetAllProvince.unsubscribe();
    }

    if (this.subcriptionGetAllDistrict) {
      this.subcriptionGetAllDistrict.unsubscribe();
    }

    if (this.subcriptionGetAllWard) {
      this.subcriptionGetAllWard.unsubscribe();
    }

    if (this.subcriptionGetAllRole) {
      this.subcriptionGetAllRole.unsubscribe();
    }

    if (this.subcriptionCreateProduct){
      this.subcriptionCreateProduct.unsubscribe();
    }
  }

}
