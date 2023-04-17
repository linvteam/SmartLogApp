import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-end-Viewer';

  constructor(private http: HttpClient) {
  }

  onSubmit(logfile: {logtoanalyze: File}){
    console.log('il file da analizzare è: ' + logfile.logtoanalyze);
    this.http.post('https://localhost:7210/api/parse', logfile)
      .subscribe((res)=> {
        console.log(res);
      });

  }
}
