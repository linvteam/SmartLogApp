import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../connection-info';

/**
 * Service per l'ottenimento dei dati di info dal backend
 */
@Injectable({
    providedIn: 'root'
})
export class InfoService {

    /**
     * Costruttore
     * @param http Il client http che effettua la chiamata al server
     * @param ConnectionURL URL del backend
     */
    constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

    /**
     * Metodo che ottiene il minimo e il massimo DateTime nel database
     * @constructor
     */
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

    /**
     * Metodo che ottiene la lista dei codici degli eventi con le relative descrizioni
     * @constructor
     */
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

    /**
     * Metodo che ottiene la lista dei firmware
     * @constructor
     */
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
