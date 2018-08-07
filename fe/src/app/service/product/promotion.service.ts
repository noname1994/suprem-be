import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class PromotionService {


    constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    }

    getALlPromotion(params) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({ "authorization": `JWT ${token}` });
        let options = {
            headers: httpHeaders,
            params: params
        }
        return this.httpClient.get(Constant.URL_PROMOTION_MANAGER, options);
    }

    createPromotion(newPromotion) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_PROMOTION_MANAGER, newPromotion, options);
    }

    updatePromotion(newPromotion) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.put(Constant.URL_PROMOTION_MANAGER, newPromotion, options);
    }

    checkNameCategory(name) {

    }

    getPromotionById(_id) {
        return this.httpClient.get(`${Constant.URL_PROMOTION_MANAGER}/${_id}`);
    }

    deletePromotion(arrId) {
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

        return this.httpClient.delete(`${Constant.URL_PROMOTION_MANAGER}`, options);
    }
}