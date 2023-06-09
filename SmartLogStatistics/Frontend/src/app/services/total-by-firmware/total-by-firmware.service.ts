import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {BaseURL} from "../../connection-info";
import {Observable} from "rxjs";
import {formatDate, registerLocaleData} from "@angular/common";
import localeIT from "@angular/common/locales/it"
registerLocaleData(localeIT, "it");

/**
 * Servizio per l'ottenimento dal backend di un JSON che rappresenta il numero di occorrenze dell'evento selezionato, comprese nell’intervallo temporale dato, raggruppate per versione firmware
 */
@Injectable({
  providedIn: 'root'
})
export class TotalByFirmwareService {

  /**
   * Crea una nuova istanza del service TotalByFirmwareService, i parametri vengono passati tramite dependency injector
   * @param http Il client http che si occupa di effettuare l'upload
   * @param ConnectionURL URL del backend
   */
  constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

  /**
   * Metodo che ottiene tramite richesta http un JSON che rappresenta il numero di occorrenze dell'evento selezionato, comprese nell’intervallo temporale dato, raggruppate per versione firmware
   * @param start Data di inizio
   * @param end Data di fine
   * @param code Code dell'evento
   * @constructor
   */
  public GetTotalByFirmware(start: Date, end: Date, code: string): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      accept: "*/*"
    });

    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';
    
    const startDatetime : string = formatDate(start, format, locale).replace(" ", "T");
    const endDatetime : string = formatDate(end, format, locale).replace(" ", "T");

    const req = new HttpRequest("GET", `${this.ConnectionURL}/data/totalbyfirmware/${startDatetime}/${endDatetime}/${code}`, {
      headers: headers,
      responseType: "json"
    });

    return this.http.request(req);
  }

}
