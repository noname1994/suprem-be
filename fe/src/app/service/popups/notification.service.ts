import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { NotificationComponent } from '../../component/popups/notification/notification.component';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';
import { Component } from '@angular/compiler/src/core';


@Injectable()
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {

    }
    createNotification(component: any, data: any, duration: number, verticalPosition: MatSnackBarVerticalPosition, horizontalPosition: MatSnackBarHorizontalPosition) {
        this.snackBar.openFromComponent(component, {
            data: data,
            duration: 2000,
            verticalPosition: verticalPosition,
            horizontalPosition: horizontalPosition,
        });
    }
}