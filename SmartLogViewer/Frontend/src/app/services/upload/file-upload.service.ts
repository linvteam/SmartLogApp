import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURL } from "../../connection-info";

/**
 * Questo service si occupa di effettuare l'upload del file di log e riceverne i dati 
 */
@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    /**
     * Crea una nuova istanza del service di upload, i parametri vengono passati tramite dependency injector
     * @param http Il client http che effettua la chiamata al server
     * @param ConnectionURL URL del backend
     */
    constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

    /**
     * Effettua la chiamata al server
     * @param file File da mandare al server per la fase di parsing
     * @returns Oggetto observable che ritorna la risposta appena disponibile
     */
    public upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const headers = new HttpHeaders({
            accept: '*/*'
        });

        const req = new HttpRequest('POST', `${this.ConnectionURL}/parse`, formData, {
            headers: headers,
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }
}
