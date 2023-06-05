import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {BaseURL} from "../../connection-info";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class TotalByCodeService {

  /**
   * Subject per la notifica del component statistics-table
   */
  private signal: Subject<boolean> = new Subject<boolean>();

  /**
   *  Observable per la notifica del component statistics-table
   */
  public observableSignal: Observable<boolean> = this.signal.asObservable();

  /**
   * Richiesta HTTP per ottenere le statistiche
   */
  public request : Observable<HttpEvent<any>> = new Observable<HttpEvent<any>>();

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
  public GetStatistics(start: Date, end: Date): void {
    const headers = new HttpHeaders({
      accept: "*/*"
    });

    const format = 'yyyy-MM-dd HH:mm:ss.SSS';
    const locale = 'it-IT';

    const startDatetime : string = formatDate(start, format, locale);
    const endDatetime : string = formatDate(end, format, locale);

    const req = new HttpRequest("GET", `${this.ConnectionURL}/totalbycode/${startDatetime}/${endDatetime}`, {
      headers: headers,
      responseType: "json"
    });

    this.request = this.http.request(req);
    this.signal.next(true);
  }
  
}
