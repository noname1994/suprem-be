import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { AppComponent } from "../app.component";
import { PagesComponent } from "../pages/pages/pages.component";
import { DashboardComponent } from "../component/dashboard/dashboard.component";
import { BannerImageComponent } from "../component/banner-image/banner-image.component";
import { EmployeeComponent } from "../component/employee/employee.component";
import { ProductComponent } from "../component/product/product.component";
import { RoleComponent } from "../component/role/role.component";
import { CategoryComponent } from "../component/category/category.component";
import { PromotionComponent } from "../component/promotion/promotion.component";
import { EmployeeListComponent } from "../component/employee/employee-list/employee-list.component";
import { FormCreationEmpComponent } from "../component/employee/form-creation-emp/form-creation-emp.component";
import { CategoryListComponent } from "../component/category/category-list/category-list.component";
import { FormCreationCategoryComponent } from "../component/category/form-creation-category/form-creation-category.component";
import { ProductListComponent } from "../component/product/product-list/product-list.component";
import { FormCreationProductComponent } from "../component/product/form-creation-product/form-creation-product.component";
import { PromotionListComponent } from "../component/promotion/promotion-list/promotion-list.component";
import { FormCreationPromotionComponent } from "../component/promotion/form-creation-promotion/form-creation-promotion.component";
import { BannerImageListComponent } from "../component/banner-image/banner-image-list/banner-image-list.component";
import { FormCreationBannerImgComponent } from "../component/banner-image/form-creation-banner-img/form-creation-banner-img.component";
import { FormEditCategoryComponent } from "../component/category/form-edit-category/form-edit-category.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/",
        pathMatch: "full"
    },
    {
        path: "",
        component: PagesComponent,
        children: [
            {
                path: "",
                redirectTo: "dashboard",
                pathMatch: "full"
            },
            {
                path: "dashboard",
                component: DashboardComponent
            },
            {
                path: "banner-image",
                component: BannerImageComponent,
                children: [
                    {
                        path: "",
                        redirectTo: "/list",
                        pathMatch: "full"
                    },
                    {
                        path: "list",
                        component: BannerImageListComponent
                    },
                    {
                        path: "create",
                        component: FormCreationBannerImgComponent
                    }
                ]
            },
            {
                path: "employee",
                component: EmployeeComponent,
                children: [
                    {
                        path: "",
                        redirectTo: "/list",
                        pathMatch: "full"
                    },
                    {
                        path: "list",
                        component: EmployeeListComponent
                    },
                    {
                        path: "create",
                        component: FormCreationEmpComponent
                    }
                ]
            },
            {
                path: "role",
                component: RoleComponent,
            },
            {
                path: "product",
                component: ProductComponent,
                children: [
                    {
                        path: "",
                        redirectTo: "/list",
                        pathMatch: "full"
                    },
                    {
                        path: "list",
                        component: ProductListComponent
                    },
                    {
                        path: "create",
                        component: FormCreationProductComponent
                    }
                ]
            },
            {
                path: "category",
                component: CategoryComponent,
                children: [
                    {
                        path: "",
                        redirectTo: "/list",
                        pathMatch: "full"
                    },
                    {
                        path: "list",
                        component: CategoryListComponent
                    },
                    {
                        path: "create",
                        component: FormCreationCategoryComponent
                    },
                    {
                        path:"edit",
                        component: FormEditCategoryComponent
                    }
                ]
            },
            {
                path: "promotion",
                component: PromotionComponent,
                children: [
                    {
                        path: "",
                        redirectTo: "/list",
                        pathMatch: "full"
                    },
                    {
                        path: "list",
                        component: PromotionListComponent
                    },
                    {
                        path: "create",
                        component: FormCreationPromotionComponent
                    }
                ]
            }
        ]
    },
];

// export const Routing = RouterModule.forRoot(routes, { useHash: true });
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
