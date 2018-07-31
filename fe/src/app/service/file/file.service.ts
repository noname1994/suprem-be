import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../../models/employee/role.model';
import { Constant } from '../../utils/constant';


@Injectable()
export class FileService {

    constructor(private httpClient: HttpClient) {

    }

    uploadFile(files) {
        let httpHeaders = new HttpHeaders({
            "authorization": `JWT ${Constant.EXAMPLE_JWT}`
        });

        let formData: FormData = new FormData();
        files.forEach(file => {
            formData.append(Constant.KEY_FILE_NAME_UPLOAD, file);
        });

        let options = {
            headers: httpHeaders
        }
        return this.httpClient.post(Constant.URL_UPLOAD_FILE, formData, options);
    }

}