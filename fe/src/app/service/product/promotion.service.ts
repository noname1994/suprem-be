import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';


@Injectable()
export class PromotionService {

    constructor(private httpClient: HttpClient) {

    }
    getALlPromotion(params) {
        let httpHeaders = new HttpHeaders({ "authorization": `JWT ${Constant.EXAMPLE_JWT}` });
        let options = {
            headers: httpHeaders,
            params: params
        }
        return this.httpClient.get(Constant.URL_PROMOTION_MANAGER, options);
    }

    createPromotion(newPromotion) {
        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${Constant.EXAMPLE_JWT}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_PROMOTION_MANAGER, newPromotion, options);
    }

    updatePromotion(newPromotion) {
        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${Constant.EXAMPLE_JWT}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.put(Constant.URL_PROMOTION_MANAGER, newPromotion, options);
    }

    checkNameCategory(name) {

    }

    getCategoryById(_id) {
        return this.httpClient.get(`${Constant.URL_CATEGORY_MANAGER}/${_id}`);
    }
}