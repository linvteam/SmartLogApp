import { LogService } from "../services/log/log.service";
import { LogManipulator } from "./log-manipulator"; 
import { LogRow } from "../log.classes";

/**
 * Questa classe si occupa di fornire al grafico e alla tabella gli eventi del logservice
 */
export class Identity implements LogManipulator {

    private logService!: LogService; // Log service che fornisce gli eventi

    /**
     * Imposta il logservice di cui rilanciare gli eventi
     * @param logService
     */
    setLogService(logService: LogService): void {
        this.logService = logService;
    }

    /**
     * Ottiene sempre 1 perchè questa funzionalità non prevede il raggruppamento
     * @returns
     */
    getNumberOfGroups(): number {
        return 1;
    }

    /**
     * Ritorna tutta la lista degli eventi forniti dal logservice
     * @param _ Parametro ignorato
     * @returns Lista degli eventi fornita dal logservice
     */
    getGroup(_: number): LogRow[] {
        return this.logService.getLog().Events;
    }

}
