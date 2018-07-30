import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';


@Injectable()
export class CategoryService {

    constructor(private httpClient: HttpClient) {

    }
    getALlCategory(params) {
        let httpHeaders = new HttpHeaders({ "authorization": `JWT ${Constant.EXAMPLE_JWT}` });
        let httpParams = new HttpParams(params);

        let options = {
            headers: httpHeaders,
            params: httpParams
        }
        return this.httpClient.get(Constant.URL_CATEGORY_MANAGER, options);
    }

    createCategory(newCategory) {
        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${Constant.EXAMPLE_JWT}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_CATEGORY_MANAGER, newCategory, options);
    }

    updateCategory(newCategory) {
        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${Constant.EXAMPLE_JWT}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.put(Constant.URL_CATEGORY_MANAGER, newCategory, options);
    }

    checkNameCategory(name) {

    }
}