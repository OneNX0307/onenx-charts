import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {WaferChartModule} from '../../projects/wafer-chart/src/lib/wafer-chart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WaferChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
