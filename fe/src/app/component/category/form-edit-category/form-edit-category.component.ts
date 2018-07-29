import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from '../../../models/product/category.model';

@Component({
  selector: 'app-form-edit-category',
  templateUrl: './form-edit-category.component.html',
  styleUrls: ['./form-edit-category.component.scss']
})
export class FormEditCategoryComponent implements OnInit {

  constructor() { }

  private imgSource;

  private category: Category;

  private defaultDate = new Date();

  private defaultImageCover = "../../../../assets/Koala.jpg";

  private fgCategory: FormGroup;

  private name: FormControl;

  private description: FormControl;


  ngOnInit() {

    this.getCategoryById();

    this.imgSource = this.category.imageCover;

    this.fgCategory = new FormGroup(
      {
        name: new FormControl(this.category.name, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        description: new FormControl(this.category.description, [Validators.maxLength(500)])
      }
    )
  }

  /**
   * get data
   */

  getCategoryById() {
    this.category = { _id: "00001", name: "Category 1", imageCover: this.defaultImageCover, status: "ACTIVE", description: "Nothing to write...", createdAt: this.defaultDate, updatedAt: this.defaultDate };

  }

  removeImage() {
    console.log("remove image");
    this.imgSource = null;
  }


  fileChangeEvent(fileInput): void {
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(' ', fileInput.target.files, ' ', fileInput.target.files[0]);
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSource = e.target.result;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  /**
  * Get Error
  */
  getErrorFieldName() {
    if (this.fgCategory.controls.name.hasError('required')) {
      return 'Trường này không được trống';
    }
    if (this.fgCategory.controls.name.hasError('maxlength') || this.fgCategory.controls.name.hasError('minlength')) {
      return 'Độ dài trong khoảng [4-50]'
    }
    return '';
  }

  getErrorFieldDescription() {
    if (this.fgCategory.controls.description.hasError('maxlength')) {
      return 'Độ dài trong khoảng [0-500]';
    }
    return '';
  }


  /**
   * action user
   */
  updateCategory() {
    if (this.fgCategory.valid) {
      let newCategoryObject = this.fgCategory.value;

    }
  }

}
