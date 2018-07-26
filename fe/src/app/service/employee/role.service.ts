import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Contant } from '../../utils/constant';
import { SuccessResponse } from '../../models/response/obj.success.res';
import { ErrorResponse } from '../../models/response/obj.error.res';


@Injectable()
export class RoleService {

    constructor(private httpClient: HttpClient) {

    }
    getAllRole() {

        let headers = new HttpHeaders({ "authorization": `JWT ${Contant.EXAMPLE_JWT}` });
        let options = {
            headers: headers
        }
        return this.httpClient.get(Contant.URL_GET_ROLE, options);
    }
}