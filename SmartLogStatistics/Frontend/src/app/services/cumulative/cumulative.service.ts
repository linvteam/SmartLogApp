import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { TimeCodeHeaderComponent } from '../../components/time-code-header/time-code-header.component';
import { BaseURL } from '../../connection-info';
import { formatDate, registerLocaleData } from "@angular/common";
import localeIT from "@angular/common/locales/it";
registerLocaleData(localeIT, "it");

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

    /**
     * Invoca una richiesta HTTP per prelevare l'andamento cumulativo di un evento dato un intervallo temporale
     * @param code Codice dell'evento
     * @param start Lower-bound del intervallo temporale da prendere in esame
     * @param end Upper-bound del intervallo temporale da prendere in esame
     * @returns
     */
    public GetCumulativeRecords(code: string, start: Date, end: Date): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            accept: "*/*"
        });
        const dateFormat = "yyy-MM-dd HH:mm:ss.SSS"

        const formattedStart = formatDate(start, dateFormat, "it-IT").replace(" ", "T");
        const formattedEnd = formatDate(end, dateFormat, "it-IT").replace(" ", "T");

        const req = new HttpRequest("GET", `${this.ConnectionURL}/data/cumulative/${formattedStart}/${formattedEnd}/${code}`, {
            headers: headers,
            responseType: "json"
        });

        return this.http.request(req);
    }
}
