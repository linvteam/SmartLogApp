import { Injectable } from '@angular/core';
import { Log } from '../../log.classes';

/**
 * Questo service rende disponibile il log con tutte le informazioni alle altre componenti
 */
@Injectable({
  providedIn: 'root'
})
export class LogService {

    /**
     * Costruisce una nuova istanza del service
     */
    constructor() {
        this.actualLog = undefined;
    }

    /**
     * Il log ricevuto dal backend
     */
    private actualLog?: Log;

    /**
     * Assegna il log al service
     */
    public set Log (log: Log) {
        this.actualLog = log;
    }

    /**
     * Ottiene il log salvato nel service
     * @returns Il log integrale con tutte le informazioni ad esso collegate
     */
    public getLog() : Log {
        return (this.actualLog) as Log;
    }

    /**
     * Verifica se è presente un log  nel service
     * @returns True se c'è un log valido, false altrimenti
     */
    public validLog(): boolean {
        return this.actualLog != undefined;
    }

    /**
     * Rimuove il log dal service
     */
    public clean(): void {
        this.actualLog = undefined;
    }

}
