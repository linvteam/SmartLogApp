import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Classe per la gestione degli errori 
 */
@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.css']
  })
  export class ErrorModalComponent {
      /**
       * Funzione di callback
       * @private
       */
      private callback: any;
      /**
       * Messaggio di errore
       */
      public errorMessage: string = '';
  
      /**
       * Costruttore
       * @param activeModal Modal attivo
       */
      constructor(private activeModal: NgbActiveModal) {
      }

    /**
     * Setup del modal di errore
     * @param errorMessage Messaggio di errore
     * @param callback Funzione di callback
     */
    public setup(errorMessage: string, callback: any): void {
        this.errorMessage = errorMessage;
        this.callback = callback;
    }

    /**
     * Metodo che chiude il modal aperto e chiama la funzione di callback
     */
    public retry(): void {
        this.activeModal.close();
        this.callback();
    }
  }
