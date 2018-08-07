import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class EmployeeService {


    constructor(private httpClient: HttpClient, private cookieService: CookieService) {

    }
    getAllEmployee(params) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);
        let httpHeaders = new HttpHeaders({ "authorization": `JWT ${token}` });
        let httpParams = new HttpParams(params);

        let options = {
            headers: httpHeaders,
            params: httpParams
        }
        return this.httpClient.get(Constant.URL_EMPLOYEE_FOR_ADMIN, options);
    }

    createEmployee(newEmployee) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);
        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_EMPLOYEE_FOR_ADMIN, newEmployee, options);
    }

    updateEmployee(newEmployee) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);
        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.put(Constant.URL_EMPLOYEE_FOR_ADMIN, newEmployee, options);
    }

    login(body) {
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_LOGIN, body, options);
    }
}