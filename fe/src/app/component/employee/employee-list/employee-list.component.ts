import { Component, OnInit } from '@angular/core';
import { ArrayObject } from '../../../models/response/array.res';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { Employee } from '../../../models/employee/employee.model';
import { EmployeeService } from '../../../service/employee/employee.service';
import { throwError } from 'rxjs';

import { Router } from "@angular/router";
import { NotificationService } from '../../../service/popups/notification.service';
import { NotificationComponent } from '../../popups/notification/notification.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  private arrEmp: Array<Employee> = [];

  private totalRecord: number = 0;

  constructor(private employeeService: EmployeeService, private router: Router, private notificationService: NotificationService) { }


  ngOnInit() {
    this.getAllEmployee();
  }

  getAllEmployee() {
    let params = {};
    this.employeeService.getAllEmployee(params)
      .subscribe((entityRes: SuccessResponse<ArrayObject<Array<Employee>>>) => {
        console.log("entityRes: ", entityRes);
        this.arrEmp = entityRes.value.list;
        this.totalRecord = entityRes.value.total;
      }, (httpError: HttpErrorResponse) => {
        this.handleError(httpError.error);
      })
  }

  openFormCreateionEmp() {
    this.router.navigateByUrl('/employee/create');
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
