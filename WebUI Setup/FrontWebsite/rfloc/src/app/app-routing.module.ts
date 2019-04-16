import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HubComponent } from './hub/hub.component';

const routes: Routes = [
  {path: '', redirectTo: 'rf-loc', pathMatch: 'full'},
  {path: 'rf-loc', component: HubComponent},
  {path: 'dashboard', component: DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
