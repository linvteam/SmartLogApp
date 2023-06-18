import { Injectable } from '@angular/core';
import { LogService } from "../log/log.service";
import { LogManipulator } from "../../LogManipulator/log-manipulator";
import { Identity } from "../../LogManipulator/identity"
import {Observable, Subject} from "rxjs";

/**
 * Questo service si occupa di trasmettere alla tabella e al grafico l'oggetto che filtra i dati del log da visualizzare
 */
@Injectable({
    providedIn: 'root'
})
export class LogManipulationService {

    /**
     * Subject che prende i nuovi log manipulator per notificarli alla view
     */
    private manipulator : Subject<LogManipulator> = new Subject<LogManipulator>();

    /**
     * Observable al quale la view effettuer� la subscribe per ottenere i nuovi log manipulator
     */
    public manipulatedLog : Observable<LogManipulator> = this.manipulator.asObservable();

    /**
     * Costruisce una nuova istanza del log manipulation service, i parametri vengono passati dal dependy injector
     * @param logService Il log service con tutti gli eventi 
     */
    constructor(private logService: LogService) {
    }

    /**
     * Imposta il nuovo LogManipulator al quale verr� assegnato il LogService prima di essere mandato alla view
     * @param m Il nuovo LogManipulator in arrivo dal widget di ricerca/filtraggio
     */
    public setManipulation(m: LogManipulator): void {
        m.setLogService(this.logService);
        this.manipulator.next(m);
    }

    /**
     * Ottiene il logManipulator Identity, considerato di default
     * @returns Log manipulator identity
     */
    public getDefaultManipulator(): LogManipulator {
        let man = new Identity();
        man.setLogService(this.logService);
        return man;
    }

}
