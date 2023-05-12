import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FileInfoComponent } from './components/file-info/file-info.component';
import { TableSearchComponent } from './components/table-search/table-search.component';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from "ag-grid-angular";
import { BaseURL } from "./connection-info";
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { EventSearchComponent } from './components/event-search/event-search.component';
import { SequenceSearchComponent } from './components/sequence-search/sequence-search.component';
import { EventGroupingComponent } from './components/event-grouping/event-grouping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { ChartHeaderComponent } from "./components/chart-header/chart-header.component";
import { ChartSearchComponent } from "./components/chart-search/chart-search.component";
import { FileDroppedDirective } from './file-dropped.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        FileInfoComponent,
        TableSearchComponent,
        TableComponent,
        ChartComponent,
        FileUploadComponent,
        TableHeaderComponent,
        EventSearchComponent,
        SequenceSearchComponent,
        EventGroupingComponent,
        ChartHeaderComponent,
        ChartSearchComponent,
        FileDroppedDirective
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        AgGridModule,
        FormsModule,
        ReactiveFormsModule,
        MdbAccordionModule,
        NgMultiSelectDropDownModule
    ],
    providers: [
        { provide: BaseURL, useValue: 'https://localhost:7210/api' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
