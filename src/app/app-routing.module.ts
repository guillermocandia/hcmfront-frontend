import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_services/index';
import { WorkingDayComponent } from './working-day/index';
import { WorkingDayDetailComponent } from './working-day/index';


const routes: Routes = [
  { path: 'working-day', component: WorkingDayComponent, canActivate: [AuthGuard] },
  { path: 'working-day/detail/:id' , component: WorkingDayDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/working-day', pathMatch: 'full' },
  { path: '**', redirectTo: '/working-day', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
