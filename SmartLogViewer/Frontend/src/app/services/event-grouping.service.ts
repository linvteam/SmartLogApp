import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import {LogRow} from "../log.classes";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class EventGroupingService {

  //tempo di raggruppamento
  private regroupTimeSource = new BehaviorSubject<number>(0);
  currentRegroupTime = this.regroupTimeSource.asObservable();

  //data di inizio del raggruppamento
  private startRegroupSource = new BehaviorSubject<Date>(new Date());
  currentStartRegroup = this.startRegroupSource.asObservable();

  //data di fine del raggruppamento
  private endRegroupSource = new BehaviorSubject<Date>(new Date());
  currentEndRegroup = this.endRegroupSource.asObservable();

  constructor(private logService: LogService) { }
  
  /***
   * cambio del valore del tempo di raggruppamento
   * @param regroupTime : nuovo valore
   */
  changeRegroupTimeValue(regroupTime : number){
    this.regroupTimeSource.next(regroupTime);
  }

  //cambio del valore del tempo di inizio del raggruppamento
  changeStartRegroupValue(startRegroup : Date){
    this.startRegroupSource.next(startRegroup);
  }

  /***
   * cambio del valore del tempo di fine del raggruppamento
   * @param endRegroup : nuovo valore
   */
  changeEndRegroupValue(endRegroup : Date){
    this.endRegroupSource.next(endRegroup);
  }
  
  /***
   * numero di raggruppamenti nel log
   * @param regroupTime : tempo secondo il quale raggruppare
   */
  getNumberOfRegroups(regroupTime : number){
    //trovo la data dell'evento iniziale
    let start = new Date ([this.logService.getLog().Events.at(this.logService.getLog().Events.length-1)!.Date, this.logService.getLog().Events.at(this.logService.getLog().Events.length-1)!.Time].join('T').replaceAll("/", "-") + "Z");
    //trovo la data dell'evento finale
    let end = new Date ([this.logService.getLog().Events.at(0)!.Date, this.logService.getLog().Events.at(0)!.Time].join('T').replaceAll("/", "-") + "Z");
    
    //calcolo il numero di raggruppamenti nel log
    if(regroupTime!=0){
      return Math.trunc(((end.getTime() - start.getTime()) / regroupTime))+1;
    }
    return 1;
  }
  
  /***
   * raggruppamento numero index con tempo regroupTime
   * @param index : indice del raggruppamento richiesto
   * @param regroupTime : tempo secondo il quale raggruppare
   */
  getRegroup(index : number, regroupTime : number){
    //il tempo di raggruppamento uguale a 0 implica la visualizzazione dell'intero log
    if(regroupTime==0){
      //in teoria non viene mai eseguito (potrebbe essere utile per i test)
      return this.logService.getLog().Events;
    }
    else {
      //trovo la data dell'evento iniziale
      let start = new Date ([this.logService.getLog().Events.at(this.logService.getLog().Events.length-1)!.Date, this.logService.getLog().Events.at(this.logService.getLog().Events.length-1)!.Time].join('T').replaceAll("/", "-") + "Z");

      //trovo l'inizio e la fine del raggruppamento in ms
      let startRegroup = new Date(start.getTime() + (index-1) * regroupTime)
      let endRegroup = new Date(start.getTime() + index * regroupTime)

      //aggiorno i valori globali di inizio e di fine del raggruppamento
      this.changeStartRegroupValue( startRegroup );
      this.changeEndRegroupValue( endRegroup );
      
      //filtraggio degli eventi del log contenuti nell'intervallo tra l'inizio e la fine del raggruppamento
      return this.logService.getLog().Events.filter( (e:LogRow) => {
        let DateTime = new Date([e.Date, e.Time].join('T').replaceAll("/", "-") + "Z").getTime();
        return DateTime >= startRegroup.getTime() && DateTime <= endRegroup.getTime();
      } );
    }
  }
  
}
