import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { AppComponent } from "../app.component";
import { PagesComponent } from "../pages/pages/pages.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: PagesComponent
    },

];

// export const Routing = RouterModule.forRoot(routes, { useHash: true });
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
