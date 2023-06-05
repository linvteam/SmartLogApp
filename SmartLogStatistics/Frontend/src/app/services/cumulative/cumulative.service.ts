import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { TimeCodeHeaderComponent } from '../../components/time-code-header/time-code-header.component';
import { BaseURL } from '../../connection-info';

@Injectable({
  providedIn: 'root'
})
export class CumulativeService {

    /**
       * Costruttore
       * @param http Il client http che effettua la chiamata al server
       * @param ConnectionURL URL del backend
       */
    constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) {
    }

    public GetCumulativeRecords(code: string, start: Date, end: Date): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            accept: "*/*"
        });

        const req = new HttpRequest("GET", `${this.ConnectionURL}/data/cumulative/${start.toISOString()}/${end.toISOString()}/${code}`, {
            headers: headers,
            responseType: "json"
        });

        return this.http.request(req);
    }
}
