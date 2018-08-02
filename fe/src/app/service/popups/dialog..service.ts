import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { NotificationComponent } from '../../component/popups/notification/notification.component';
import { MatDialog } from '@angular/material';
import { Component } from '@angular/compiler/src/core';


@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog) {

    }
    createDialog(component: any, data: any, width: string, height: string) {
        return this.dialog.open(component, {
            width: width,
            maxHeight: height,
            data: data
        });
    }
}