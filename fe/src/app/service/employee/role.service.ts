import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';
import { SuccessResponse } from '../../models/response/obj.success.res';
import { ErrorResponse } from '../../models/response/obj.error.res';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class RoleService {


    constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    }
    getAllRole() {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let headers = new HttpHeaders({ "authorization": `JWT ${token}` });
        let options = {
            headers: headers
        }
        return this.httpClient.get(Constant.URL_GET_ROLE, options);
    }
}