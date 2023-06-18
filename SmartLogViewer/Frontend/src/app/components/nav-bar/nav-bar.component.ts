import { Component } from '@angular/core';
import { LogService } from '../../services/log/log.service';

/**
 * Classe che gestisce il comportamento della navbar
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

    /**
     * Costruttore del componente
     * @param logService LogService utilizzato per sapere quando ci sono degli eventi caricati ed � possibile attivare la visualizzazione a tabella o grafico
     */
    constructor(public logService: LogService) { }

    /**
     * Indica quando la navbar � chiusa, � necessario per gestire il layout per schermi piccoli
     */
    public isCollapsed = true;

    /**
     * Metodo che si occupa di gestire l'apertura e la chiusura della navbar alla pressione del pulsante
     */
    public Collapse(){
        this.isCollapsed = !this.isCollapsed;
    }
}
