import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';

// ルート
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
