import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AgmCoreModule } from "@agm/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent, DetectorDialog } from './dashboard/dashboard.component';
import { HubComponent, OptInDialog } from './hub/hub.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HubComponent,
    DetectorDialog,
    OptInDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'APIKEY'
    })
  ],
  entryComponents: [DetectorDialog, OptInDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
