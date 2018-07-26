import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  openFormCreationPromotion() {
    this.router.navigateByUrl("/promotion/create");
  }
}
