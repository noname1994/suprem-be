import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-image-list',
  templateUrl: './banner-image-list.component.html',
  styleUrls: ['./banner-image-list.component.scss']
})
export class BannerImageListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  openFormCreationBannerImg(){
    this.router.navigateByUrl("/banner-image/create");
  }

}
