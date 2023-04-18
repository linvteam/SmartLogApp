import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

const routes: Routes = [
  { path: '', redirectTo: '/file-upload', pathMatch: 'full' },
  { path: 'table', component: TableComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'file-upload', component: FileUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
