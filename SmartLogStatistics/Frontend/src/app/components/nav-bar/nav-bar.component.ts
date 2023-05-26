import { Component } from '@angular/core';

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
