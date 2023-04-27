import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FileInfoComponent } from './components/file-info/file-info.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import {AgGridModule} from "ag-grid-angular";
import {BaseURL} from "./connection-info";
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FileInfoComponent,
    SearchComponent,
    TableComponent,
    ChartComponent,
    FileUploadComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AgGridModule
  ],
  providers: [
    { provide: BaseURL, useValue: 'https://localhost:7210' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
