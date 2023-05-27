import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {StatisticsTableComponent} from "./components/statistics-table/statistics-table.component";
import {EventTableComponent} from "./components/event-table/event-table.component";
import {CumulativeChartComponent} from "./components/cumulative-chart/cumulative-chart.component";
import {HistogramComponent} from "./components/histogram/histogram.component";
import {PieChartComponent} from "./components/pie-chart/pie-chart.component";


const routes: Routes = [
  { path: '', redirectTo: '/file-upload', pathMatch: 'full' },
  { path: 'file-upload', component: FileUploadComponent},
  { path: 'statistics-table', component: StatisticsTableComponent },
  { path: 'event-table', component: EventTableComponent },
  { path: 'cumulative-chart', component: CumulativeChartComponent },
  { path: 'histogram', component: HistogramComponent },
  { path: 'pie-chart', component: PieChartComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
