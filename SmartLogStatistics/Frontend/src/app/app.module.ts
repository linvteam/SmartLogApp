import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { StatisticsTableComponent } from './components/statistics-table/statistics-table.component';
import { EventTableComponent } from './components/event-table/event-table.component';
import { HistogramComponent } from './components/histogram/histogram.component';
import { CumulativeChartComponent } from './components/cumulative-chart/cumulative-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { TimeComponent } from './components/time/time.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { FileDroppedDirective } from './file-dropped.directive';

import { BaseURL } from './connection-info';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        FileUploadComponent,
        StatisticsTableComponent,
        EventTableComponent,
        HistogramComponent,
        CumulativeChartComponent,
        PieChartComponent,
        TimeComponent,
        FileDroppedDirective
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        MdbAccordionModule
    ],
    providers: [
        { provide: BaseURL, useValue: 'http://localhost:7253/api'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
