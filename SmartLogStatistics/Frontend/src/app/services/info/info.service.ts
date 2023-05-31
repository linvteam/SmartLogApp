import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../connection-info';

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

    public GetTimeInterval(): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            accept: "*/*"
        });

        const req = new HttpRequest("GET", `${this.ConnectionURL}/info/timeinterval`, {
            headers: headers,
            responseType: "json"
        });

        return this.http.request(req);
    }

    public GetCodesWithDescription(): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            accept: "*/*"
        });

        const req = new HttpRequest("GET", `${this.ConnectionURL}/info/codedescription`, {
            headers: headers,
            responseType: "json"
        });

        return this.http.request(req);
    }

    public GetFirmwares(): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            accept: "*/*"
        });

        const req = new HttpRequest("GET", `${this.ConnectionURL}/info/firmwarelist`, {
            headers: headers,
            responseType: "json"
        });

        return this.http.request(req);
    }

}
