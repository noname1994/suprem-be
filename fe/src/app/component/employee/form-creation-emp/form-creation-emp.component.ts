import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Ward } from '../../../models/common/address/ward.model';
import { Province } from '../../../models/common/address/province.model';
import { District } from '../../../models/common/address/district.model';
import { Role } from '../../../models/employee/role.model';

@Component({
  selector: 'app-form-creation-emp',
  templateUrl: './form-creation-emp.component.html',
  styleUrls: ['./form-creation-emp.component.scss']
})
export class FormCreationEmpComponent implements OnInit {


  arrProvince: Province[] = [
    { _id: "01", name: "Hà Nôi", type: "Thành phố" }
  ]

  arrDistrict: District[] = [
    { _id: "001", name: "Thanh Xuân", type: "Quận", location: "", province: "01" }
  ]

  arrWard: Ward[] = [
    { _id: "0001", name: "Đường nguyễn trãi", type: "Đường", location: "", district: "0001" }
  ];

  arrRole: Role[] = [
    { _id: "00001", name: "SUPER_ADMIN", permission: [] },
    { _id: "00002", name: "ADMIN", permission: [] },
    { _id: "00003", name: "EMPLOYEE", permission: [] },
    { _id: "00004", name: "STOCKER", permission: [] },
    { _id: "00005", name: "ACCOUNTANT", permission: [] }
  ]

  constructor() { }

  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Không đúng định dạng email' :
        '';
  }

}
