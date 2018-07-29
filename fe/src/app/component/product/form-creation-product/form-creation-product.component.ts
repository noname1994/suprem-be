import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/product/category.model';

@Component({
  selector: 'app-form-creation-product',
  templateUrl: './form-creation-product.component.html',
  styleUrls: ['./form-creation-product.component.scss']
})
export class FormCreationProductComponent implements OnInit {


  private imgCoverSource;

  private arrCategory: Category[] = [
    { _id: "0001", name: "Category 1", imageCover: null, description: "", status: "ACTIVE", createdAt: null, updatedAt: null },
    { _id: "0002", name: "Category 2", imageCover: null, description: "", status: "ACTIVE", createdAt: null, updatedAt: null }
  ];

  private selectedCategory = "Không có dữ liệu";

  constructor() { }

  ngOnInit() {
  }



  fileChangeEvent(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(' ', fileInput.target.files, ' ', fileInput.target.files[0]);
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgCoverSource = e.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
