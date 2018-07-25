import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/**
 * Metarial
 */
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatExpansionModule, MatMenuModule } from '@angular/material';
/**
 * Routes
 */
import { Routing } from './routes/routing-app';

/**
 * Component
 */
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages/pages.component';
import { UserMenuComponent } from './component/user-menu/user-menu.component';



@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    UserMenuComponent,
    UserMenuComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatMenuModule
  ],
  entryComponents: [UserMenuComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
