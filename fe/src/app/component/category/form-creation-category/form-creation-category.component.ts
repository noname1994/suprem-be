import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-creation-category',
  templateUrl: './form-creation-category.component.html',
  styleUrls: ['./form-creation-category.component.scss']
})
export class FormCreationCategoryComponent implements OnInit {

  constructor() { }

  private imgSource;

  private fgCategory: FormGroup;

  private name: FormControl;

  private description: FormControl;


  ngOnInit() {

    this.fgCategory = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        description: new FormControl('', [Validators.maxLength(500)])
      }
    )
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


  insertNewCategory() {
    if (this.fgCategory.valid) {
      let newCategoryObject = this.fgCategory.value;
      
    }
  }

}
