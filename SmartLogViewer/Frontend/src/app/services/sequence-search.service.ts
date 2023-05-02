import {Injectable} from '@angular/core';
import {Event, Sequence} from "../sequence.classes";
import {LogRow} from "../log.classes";
import {first} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SequencesSearchService {
  
  constructor() {
  }
  
  public findSequences(sequence: Sequence, rows: LogRow[]): LogRow[][] {
    let filteredEvents : LogRow[][] = [];
    let index : number = 0;
    
    let supportMatrix = this.createSupportMatrix(sequence.StartEvents, sequence.EndEvents, rows);
    
    for(let row of rows) {
      let startEvents : string[] = [];
      sequence.StartEvents.forEach((event) => startEvents.push(event.Code));
            
      if (startEvents.includes(row.Code)){
        console.log("C'è un match: " + row.Code);
      }

      index++;
    }
    
    return filteredEvents;
    
  }
  
  private createSupportMatrix(startEvents: Event[], endEvents: Event[], rows: LogRow[]) : boolean[][]{
      // Matrice che conterrà lo stato degli eventi rilevanti dopo ogni evento
      let matrix : boolean[][] = [];
      
      // Matrice che indica se un evento è già stato trovato una volta o meno (per capire lo stato precedente alla prima occorrenza)
      let found: boolean[] = [];
      
      // Codici rilevanti
      let relevantCodes : string[] = [];
      
      // Inizializzazione array per capire se l'evento è già stato trovato o meno
      // Inizializzazione codici rilevanti
      startEvents.forEach((event) => {found.push(false); relevantCodes.push(event.Code);});
      endEvents.forEach((event) => {found.push(false); relevantCodes.push(event.Code);});
      
      // Array che indica la riga precedente
      let previousRow: boolean[] = found.slice();
      
      let rowNumber: number = 0;
      
      // Per ogni evento del file di log
      for(let row of rows) {
        
        
        // Creo una matrice per lo stato degli eventi rilevanti
        let matrixRow : boolean[] = [];
        
        // La riga attuale è uguale a quella precedente
        matrixRow = previousRow;
        
        // Se l'evento è tra quelli rilevanti
        if (relevantCodes.includes(row.Code)) {
          
          // Costruisco la nuova riga della matrice
          relevantCodes.forEach( (code, index) => {
            
            // Se la colonna attuale è quella dell'evento
            if(code == row.Code){
              matrixRow.push(row.Value);                        // Inserisco il valore attuale
              
              // Se l'evento non era già stato trovato
              if (!found.at(index)) {
                found[index] = true;                           // Indico che l'evento è stato trovato
                                                               // Assegno alle righe precedenti della matrice il valore opposto a quello già presente 
              }
              
            } else {                                            // Altrimenti
              matrixRow.push(previousRow.at(index) as boolean);   // Copio la colonna precedente
            }
          })
        }                             
        previousRow = matrixRow;      // Copio la riga attuale e la indico come quella precedente per la prossima iterazione
        matrix.push(matrixRow);       // Inserisco la riga attuale nella matrice
        rowNumber++;
      }
      
      return matrix;
  }
  
}
