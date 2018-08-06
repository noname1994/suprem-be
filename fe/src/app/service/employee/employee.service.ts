import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';


@Injectable()
export class EmployeeService {

    constructor(private httpClient: HttpClient) {

    }
    getAllEmployee(params) {
        let httpHeaders = new HttpHeaders({ "authorization": `JWT ${Constant.EXAMPLE_JWT}` });
        let httpParams = new HttpParams(params);

        let options = {
            headers: httpHeaders,
            params: httpParams
        }
        return this.httpClient.get(Constant.URL_EMPLOYEE_FOR_ADMIN, options);
    }

    createEmployee(newEmployee) {
        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${Constant.EXAMPLE_JWT}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_EMPLOYEE_FOR_ADMIN, newEmployee, options);
    }

    updateEmployee(newEmployee) {
        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${Constant.EXAMPLE_JWT}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.put(Constant.URL_EMPLOYEE_FOR_ADMIN, newEmployee, options);
    }
}