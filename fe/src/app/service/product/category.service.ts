import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class CategoryService {


    constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    }

    getALlCategory(params) {

        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({ "authorization": `JWT ${token}` });
        let options = {
            headers: httpHeaders,
            params: params
        }
        return this.httpClient.get(Constant.URL_CATEGORY_MANAGER, options);
    }

    createCategory(newCategory) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_CATEGORY_MANAGER, newCategory, options);
    }

    updateCategory(newCategory) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.put(Constant.URL_CATEGORY_MANAGER, newCategory, options);
    }

    checkNameCategory(name) {

    }

    getCategoryById(_id) {
        return this.httpClient.get(`${Constant.URL_CATEGORY_MANAGER}/${_id}`);
    }

    deleteCategory(arrId) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let params = { arrId: arrId };

        let options = {
            headers: httpHeaders,
            params: params
        }

        return this.httpClient.delete(`${Constant.URL_CATEGORY_MANAGER}`, options);
    }
}