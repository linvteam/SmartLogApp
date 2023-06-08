import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from "../../connection-info";

/**
 * Questo service si occupa di effettuare l'upload dei file di log
 */
@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    /**
     * Crea una nuova istanza del service di upload, i parametri vengono passati tramite dependency injector
     * @param http Il client http che si occupa di effettuare l'upload
     * @param ConnectionURL URL del backend
     */
    constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

    /**
     * Effettua la chiamata al server
     * @param file File da caricare
     */
    public upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);
        const headers = new HttpHeaders({
            accept: '*/*'
        });

        const req = new HttpRequest('POST', `${this.ConnectionURL}/upload`, formData, {
            headers: headers,
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }
}
