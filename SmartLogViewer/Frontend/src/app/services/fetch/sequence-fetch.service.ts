import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseURL } from "../../connection-info";
import { Sequence } from "../../sequence.classes";

/**
 * Questo service si occupa di comunicare con il backend le informazioni relative alle sequenze note
 */
@Injectable({
    providedIn: 'root'
})
export class SequenceFetchService {

    /**
     * Crea un nuovo service, i parametri vengono passati dal dependency injector
     * @param http Il client http che si occuper� di comunicare con il server
     * @param ConnectionURL URL del backend
     */
    constructor(private http: HttpClient, @Inject(BaseURL) private ConnectionURL: string) {
    }

    /**
     * Ottiene la lista di nomi delle sequenze
     * @returns Oggetto observable che ritorna la lista di nomi di sequenze appena disponibili
     */
    public getSequences(): Observable<any> {
        return this.http.request('GET', `${this.ConnectionURL}/sequences`);
    }

    /**
     * Ottiene tutte le informazioni relative alla sequenza specificata
     * @param sequenceName Il nome della sequenza di cui si vuole ottenere le informazioni
     * @returns Oggetto observable che ritorna le informazioni della sequenza
     */
    public getSequenceInformation(sequenceName: string): Observable<Sequence> {
        return this.http.request<Sequence>('GET', `${this.ConnectionURL}/sequences/${sequenceName}`);
    }
}
