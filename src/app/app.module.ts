import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { ImageModule } from './image/image.module';
import { LoadingModule } from './loading/loading.module';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';

import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ルート
const appRoutes: Routes = [
  { path: 'account', loadChildren: './account/account.module#AccountModule', canActivate: [LoginGuard], },
  { path: 'config', loadChildren: './config/config.module#ConfigModule', canActivate: [AuthGuard], },
  { path: 'attendance/:at_Code', loadChildren: './attendance/attendance.module#AttendanceModule', canActivate: [AuthGuard] },
  { path: '', loadChildren: './reserve/reserve.module#ReserveModule', canActivate: [AuthGuard], },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CoreModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ImageModule,
    LoadingModule
  ],
  providers: [AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
