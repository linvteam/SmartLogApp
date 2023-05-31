import { LogService } from "../services/log/log.service";
import { LogManipulator } from "./log-manipulator"; 
import { LogRow } from "../log.classes";

/**
 * Questa classe si occupa di fornire al grafico e alla tabella gli eventi del logservice
 */
export class Identity implements LogManipulator {

    /**
     * Log service che fornisce gli eventi da mostrare successivamente alla view
     */
    private logService!: LogService;

    /**
     * Imposta il logservice di cui rilanciare gli eventi
     * @param logService Log service con tutti gli eventi da fornire alla view
     */
    public setLogService(logService: LogService): void {
        this.logService = logService;
    }

    /**
     * Ottiene sempre 1 perché questa funzionalità non prevede il raggruppamento
     * @returns Sempre 1 
     */
    public getNumberOfGroups(): number {
        return 1;
    }

    /**
     * Ritorna tutta la lista degli eventi forniti dal logservice
     * @param _ Parametro ignorato
     * @returns Lista degli eventi fornita dal logservice
     */
    public getGroup(_: number): LogRow[] {
        return this.logService.getLog().Events;
    }

}
