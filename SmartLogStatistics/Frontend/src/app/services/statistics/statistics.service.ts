import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../connection-info';
import { formatDate, registerLocaleData } from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

/**
 * Service per l'ottenimento delle statistiche dal backend
 */
@Injectable({
    providedIn: 'root'
})
export class StatisticsService {

    /**
     * Costruttore
     * @param http Il client http che effettua la chiamata al server
     * @param ConnectionURL URL del backend
     */
    constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

    /**
     * Metodo che ottiene le statistiche comprese tra il lower bound e l'upper bound dell'intervallo di ricerca
     * @param start Lower bound dell'intervallo di ricerca
     * @param end Upper bound dell'intervallo di ricerca
     */
    public GetStatistics(start: Date, end: Date): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            accept: "*/*"
        });

        const format = 'yyyy-MM-dd HH:mm:ss.SSS';
        const locale = 'it-IT';

        const startDatetime : string = formatDate(start, format, locale);
        const endDatetime : string = formatDate(end, format, locale);

        const req = new HttpRequest("GET", `${this.ConnectionURL}/statistics/${startDatetime}/${endDatetime}`, {
            headers: headers,
            responseType: "json"
        });

        return this.http.request(req);
    }

}
