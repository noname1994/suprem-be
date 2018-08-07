import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogConfirmComponent>) {
  }

  ngOnInit() {
  }

  actionDialogClose() {
    this.dialogRef.close({ confirm: true });
  }

  onNoClick() {
    this.dialogRef.close({ confirm: false });
  }
}
