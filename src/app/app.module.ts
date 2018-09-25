import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './_dialogs/index';

import { CustomMatPaginatorIntl } from './_services/index';
import { MatPaginatorIntl } from '@angular/material';

import { DateAdapter } from '@angular/material';
import { CustomDateAdapter } from './_services/index';

import { AppComponent } from './app.component';
import { WorkingDayComponent } from './working-day/index';
import { WorkingDayDetailComponent } from './working-day/index';
import { ScheduleDetailComponent } from './working-day/index';
import { LoginComponent } from './login/index';
import { MenuComponent } from './menu/index';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './_services/index';
import { AuthGuard } from './_services/index';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './_services/index';

import { WorkingDayService } from './_services/index';
import { ScheduleService } from './_services/index';


@NgModule({
  declarations: [
    AppComponent,
    DeleteDialogComponent,
    WorkingDayComponent,
    WorkingDayDetailComponent,
    ScheduleDetailComponent,
    LoginComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    AppRoutingModule
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [
    HttpClientModule,
    AuthService,
    AuthGuard,
    WorkingDayService,
    ScheduleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-CL'
    },
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
