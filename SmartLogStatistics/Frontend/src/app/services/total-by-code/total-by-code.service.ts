import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {BaseURL} from "../../connection-info";
import {formatDate, registerLocaleData} from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

/**
 * Servizio per l'ottenimento dal backend di un JSON contenente i codici con le relative frequenze
 */
@Injectable({
  providedIn: 'root'
})
export class TotalByCodeService {

  /**
   * Costruttore
   * @param http Il client http che effettua la chiamata al server
   * @param ConnectionURL URL del backend
   */
  constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

  /**
   * Metodo che ottiene una lista di codici con le relative frequenze
   * @param start Lower bound dell'intervallo di ricerca
   * @param end Upper bound dell'intervallo di ricerca
   */
  public GetTotalByCode(start: Date, end: Date): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      accept: "*/*"
    });

    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';
    
    const startDatetime : string = formatDate(start, format, locale).replace(" ", "T");
    const endDatetime : string = formatDate(end, format, locale).replace(" ", "T");
    
    const req = new HttpRequest("GET", `${this.ConnectionURL}/data/totalbycode/${startDatetime}/${endDatetime}`, {
      headers: headers,
      responseType: "json"
    });

    return this.http.request(req);
  }
  
}
