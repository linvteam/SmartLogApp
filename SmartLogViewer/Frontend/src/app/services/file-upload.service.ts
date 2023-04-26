import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseURL} from "../connection-info";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const headers = new HttpHeaders({
      accept: '*/*'});

    const req = new HttpRequest('POST', `${this.ConnectionURL}/api/parse`, formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
