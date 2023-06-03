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


    private service: Subject<CumulativeService> = new Subject<CumulativeService>();

    public serviceObs: Observable<CumulativeService> = this.service.asObservable();

    private Code: string = "";

    private Start: Date = new Date();

    private End: Date = new Date();

    /**
       * Costruttore
       * @param http Il client http che effettua la chiamata al server
       * @param ConnectionURL URL del backend
       */
    constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) {
    }

    public sendData(code: string, start: Date, end: Date) {
        this.Code = code
        this.Start = start
        this.End = end
        this.service.next(this)
    }

    public GetCumulativeRecords(): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            accept: "*/*"
        });

        const req = new HttpRequest("GET", `${this.ConnectionURL}/data/cumulative/${this.Start.toISOString()}/${this.End.toISOString()}/${this.Code}`, {
            headers: headers,
            responseType: "json"
        });

        return this.http.request(req);
    }
}
