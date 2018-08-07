import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class ProductService {


    constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    }
    getALlProduct(params) {

        // let httpHeaders = new HttpHeaders({ "authorization": `JWT ${Constant.EXAMPLE_JWT}` });
        let options = {
            // headers: httpHeaders,
            params: params
        }
        return this.httpClient.get(Constant.URL_PRODUCT_MANAGER, options);
    }

    createProduct(newProduct) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_PRODUCT_MANAGER, newProduct, options);
    }

    updateProduct(newProduct) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`,
            'Content-Type': 'application/json; charset=utf-8'
        });

        let options = {
            headers: httpHeaders
        }
        console.log("newProduct 1234 : ", newProduct);
        return this.httpClient.put(Constant.URL_PRODUCT_MANAGER, newProduct, options);
    }

    checkNameCategory(name) {

    }

    getProduct(_id) {
        return this.httpClient.get(`${Constant.URL_PRODUCT_MANAGER}/${_id}`);
    }

    deleteProduct(arrId) {
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

        return this.httpClient.delete(`${Constant.URL_PRODUCT_MANAGER}`, options);
    }
}