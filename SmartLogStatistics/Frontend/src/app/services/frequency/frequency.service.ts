import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {BaseURL} from "../../connection-info";
import { formatDate, registerLocaleData } from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

/**
 * Servizio per l'ottenimento dal backend di un JSON che rappresenta gli eventi nell'intervallo temporale dato, raggruppati per i campi specificati
 */
@Injectable({
  providedIn: 'root'
})
export class FrequencyService {

  /**
   * Crea una nuova istanza del service TotalByFirmwareService, i parametri vengono passati tramite dependency injector
   * @param http Il client http che effettua la chiamata al server
   * @param ConnectionURL URL del backend
   */
  constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

  /**
   * Metodo che ottiene tramite richesta http un JSON che rappresenta gli eventi nell'intervallo temporale dato, raggruppati per i campi specificati
   * @param start  Data di inizio
   * @param end  Data di fine
   * @param regroups Campi per il raggruppamento
   * @constructor
   */
  public GetTotalByFrequency(start: Date, end: Date, regroups: any): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      accept: "*/*"
    });

    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';
    
    const startDatetime : string = formatDate(start, format, locale).replace(" ", "T");
    const endDatetime : string = formatDate(end, format, locale).replace(" ", "T");
    
    const d = regroups.data;
    const f = regroups.firmware;
    const u = regroups.unit;
    const s = regroups.subunit;

    const req = new HttpRequest("GET", `${this.ConnectionURL}/data/frequency/${startDatetime}/${endDatetime}/?d=${d}&f=${f}&u=${u}&s=${s}`, {
      headers: headers,
      responseType: "json"
    });

    return this.http.request(req);
  }
}
