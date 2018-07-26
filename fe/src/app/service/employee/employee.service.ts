import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Contant } from '../../utils/constant';


@Injectable()
export class EmployeeService {

    constructor(private httpClient: HttpClient) {

    }
    getAllEmployee(params) {
        let httpHeaders = new HttpHeaders({ "authorization": `JWT ${Contant.EXAMPLE_JWT}` });
        let httpParams = new HttpParams(params);

        let options = {
            headers: httpHeaders,
            params: httpParams
        }
        return this.httpClient.get(Contant.URL_EMPLOYEE_FOR_ADMIN, options);
    }
}