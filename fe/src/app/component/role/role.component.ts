import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from '../../service/employee/role.service';
import { SuccessResponse } from '../../models/response/obj.success.res';
import { Role } from '../../models/employee/role.model';
import { throwError, Subscription } from 'rxjs';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy {


  private subscriptionGetAllRole: Subscription;

  private roles: Array<Role> = [];

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    console.log("oninit is called !");
    this.getAllRole();
  }

  getAllRole() {
    this.subscriptionGetAllRole = this.roleService.getAllRole().subscribe((entityRes: SuccessResponse<Array<Role>>) => {
      console.log("data: ", entityRes);
      if (entityRes.value) {
        this.roles = entityRes.value;
      }
    }, error => {
      console.error("Error get role!");
      return throwError(error);
    })
  }

  ngOnDestroy(): void {
    if (this.subscriptionGetAllRole) {
      this.subscriptionGetAllRole.unsubscribe();
    }

  }

}
