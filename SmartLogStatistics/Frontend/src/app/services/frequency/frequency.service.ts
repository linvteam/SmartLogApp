import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {BaseURL} from "../../connection-info";

/**
 * Servizio per l'ottenimento dal backend di un JSON che rappresenta gli eventi nell'intervallo temporale dato, raggruppati per i campi specificati
 */
@Injectable({
  providedIn: 'root'
})
export class FrequencyService {

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
   * Metodo che ottiene tramite richesta http un JSON che rappresenta gli eventi nell'intervallo temporale dato, raggruppati per i campi specificati
   * @param start  Data di inizio
   * @param end  Data di fine
   * @param regroups Campi per il raggruppamento
   * @constructor
   */
  GetTotalByFrequency(start: Date, end: Date, regroups: any) {
    const headers = new HttpHeaders({
      accept: "*/*"
    });
    
    const d = regroups.data;
    const f = regroups.firmware;
    const u = regroups.unit;
    const s = regroups.subunit;

    const req = new HttpRequest("GET", `${this.ConnectionURL}/data/frequency/${start.toISOString().slice(0, 16)}/${end.toISOString().slice(0, 16)}/?d=${d}&f=${f}&u=${u}&s=${s}`, {
      headers: headers,
      responseType: "json"
    });

    this.request = this.http.request(req);
    this.signal.next(true);
  }
}
