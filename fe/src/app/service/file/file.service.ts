import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class FileService {


    constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    }

    uploadFile(files, type?: string) {

        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`
        });

        let formData: FormData = new FormData();

        if (type) {
            formData.append(Constant.KEY_NAME_TYPE_UPLOAD, type);
        }

        files.forEach(file => {
            formData.append(Constant.KEY_FILE_NAME_UPLOAD, file);
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_UPLOAD_FILE, formData, options);
    }

    getAllFileUplaod() {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.get(Constant.URL_GET_ALL_FILE_UPLOAD, options);
    }


    getAllBanner() {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.get(Constant.URL_BANNER_IMAGE, options);
    }

    updateBannerStatus(_id, status) {
        let token = this.cookieService.get(Constant.TOKEN_NAME);

        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${token}`
        });

        let options = {
            headers: httpHeaders,
            params: { _id: _id, status: status }
        }
        return this.httpClient.put(Constant.URL_BANNER_IMAGE,{}, options);
    }
}