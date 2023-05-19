import { LogRow } from "../log.classes";
import { LogService } from "../services/log/log.service";

/**
 * Interfaccia che definisce come presentare i dati alla tabella e al grafico
 */
export interface LogManipulator {

    /**
     * Imposta il logservice che fornisce i dati 
     * @param logService il log service con gli eventi 
     */
    setLogService(logService: LogService): void;

    /**
     * Specifica quanti gruppi di risultati sono stati generati
     * @returns Il numero di gruppi di cui sono composti i dati
     */
    getNumberOfGroups(): number;

    /**
     * Ottiene uno dei gruppi di risultati 
     * @param index L'indice del gruppo di risultati voluto
     * @returns Lista di eventi corrispondente al gruppo indicato
     */
    getGroup(index: number): LogRow[];

}
