import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {BaseURL} from "../../connection-info";
import {Observable} from "rxjs";
import {ErrorModalComponent} from "../../components/error-modal/error-modal.component";

@Injectable({
  providedIn: 'root'
})
export class TotalByFirmwareService {

  private startDate :any;//= (new Date('2011-05-27T12:00'));
  private endDate :any;//= (new Date('2025-05-27T12:00'));
  private code :any;//= "S009";

  public setValues(start: Date, end: Date, code: string){
    this.startDate = start;
    this.endDate = end;
    this.code = code;
    //console.log(code);
    //this.GetTotalByFirmware();
  }

  /**
   * Crea una nuova istanza del service TotalByFirmwareService, i parametri vengono passati tramite dependency injector
   * @param http Il client http che si occupa di effettuare l'upload
   * @param ConnectionURL URL del backend
   */
  constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

  public GetTotalByFirmware(): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      accept: "*/*"
    });

    const req = new HttpRequest("GET", `${this.ConnectionURL}/data/totalbyfirmware/${this.startDate.toISOString().slice(0, 16)}/${this.endDate.toISOString().slice(0, 16)}/${this.code}`, {
      headers: headers,
      responseType: "json"
    });
    
    return this.http.request(req);
  }
  
}
