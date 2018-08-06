import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Constant } from '../../utils/constant';
import { SuccessResponse } from '../../models/response/obj.success.res';
import { ErrorResponse } from '../../models/response/obj.error.res';


@Injectable()
export class VNLocationService {

    constructor(private httpClient: HttpClient) {

    }
    getAllProvince() {

        // let headers = new HttpHeaders({ "authorization": `JWT ${Constant.EXAMPLE_JWT}` });
        // let options = {
        //     headers: headers
        // }
        return this.httpClient.get(Constant.URL_VN_LOCATION_PROVINCE);
    }

    getAllDistrictByProvince(provinceId) {
        return this.httpClient.get(`${Constant.URL_VN_LOCATION_DISTRICT}?provinceId=${provinceId}`);
    }

    getALlWardByDistrict(districtId) {
        return this.httpClient.get(`${Constant.URL_VN_LOCATION_WARD}?districtId=${districtId}`);
    }
}