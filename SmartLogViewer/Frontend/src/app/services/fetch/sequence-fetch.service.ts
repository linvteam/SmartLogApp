import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseURL} from "../../connection-info";
import {Sequence} from "../../sequence.classes";

@Injectable({
  providedIn: 'root'
})
export class SequenceFetchService {

  constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) {
  }

  getSequences(): Observable<any> {
    return this.http.request('GET', `${this.ConnectionURL}/sequences`);
  }

  getSequenceInformation(sequenceName: string): Observable<Sequence> {
    return this.http.request<Sequence>('GET', `${this.ConnectionURL}/sequences/${sequenceName}`);
  }
}
