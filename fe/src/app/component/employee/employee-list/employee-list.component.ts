import { Component, OnInit } from '@angular/core';
import { ArrayObject } from '../../../models/response/array.res';
import { SuccessResponse } from '../../../models/response/obj.success.res';
import { Employee } from '../../../models/employee/employee.model';
import { EmployeeService } from '../../../service/employee/employee.service';
import { throwError } from 'rxjs';

import { Router } from "@angular/router";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  private arrEmp: Array<Employee> = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }


  ngOnInit() {
    this.getAllEmployee();
  }

  getAllEmployee() {
    let params = {};
    this.employeeService.getAllEmployee(params)
      .subscribe((entityRes: SuccessResponse<ArrayObject<Array<Employee>>>) => {
        console.log("entityRes: ", entityRes);
        if (entityRes.value) {
          this.arrEmp = entityRes.value.list;
        }
      }, error => {
        console.error("Error get role!");
        return throwError(error);
      })
  }

  openFormCreateionEmp() {
    this.router.navigateByUrl('/employee/create');
  }
}
