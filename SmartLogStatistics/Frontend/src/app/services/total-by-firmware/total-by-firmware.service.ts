import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {BaseURL} from "../../connection-info";
import {Observable, Subject} from "rxjs";

/**
 * Servizio per l'ottenimento dal backend di un JSON che rappresenta il numero di occorrenze dell'evento selezionato, comprese nell’intervallo temporale dato, raggruppate per versione firmware
 */
@Injectable({
  providedIn: 'root'
})
export class TotalByFirmwareService {

  /**
   * Subject per la notifica del component PieChartComponent
   */
  public signal: Subject<boolean> = new Subject<boolean>();
  /**
   *  Observable per la notifica del component PieChartComponent
   */
  public observableSignal: Observable<boolean> = this.signal.asObservable();
  /**
   *  Richiesta HTTP per ottenere i dati
   */
  public request: Observable<HttpEvent<any>> = new Observable<HttpEvent<any>>();

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
  public GetTotalByFirmware(start: Date, end: Date, code: string): void {
    const headers = new HttpHeaders({
      accept: "*/*"
    });

    const req = new HttpRequest("GET", `${this.ConnectionURL}/data/totalbyfirmware/${start.toISOString().slice(0, 16)}/${end.toISOString().slice(0, 16)}/${code}`, {
      headers: headers,
      responseType: "json"
    });

    this.request = this.http.request(req);
    this.signal.next(true);
  }

}
