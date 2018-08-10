import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss']
})
export class BannerImageComponent implements OnInit {

  public isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
