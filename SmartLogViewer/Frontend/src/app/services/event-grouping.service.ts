import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import {LogRow} from "../log.classes";
import {LogService} from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class EventGroupingService {

  private regroupTimeSource = new BehaviorSubject<number>(0);
  currentRegroupTime = this.regroupTimeSource.asObservable();


  private startRegroupSource = new BehaviorSubject<Date>(new Date());
  currentStartRegroup = this.startRegroupSource.asObservable();

  private endRegroupSource = new BehaviorSubject<Date>(new Date());
  currentEndRegroup = this.endRegroupSource.asObservable();
  
  private regroupEvents : number [][];
  //private startRegroup : number;
  //private endRegroup : number;

  constructor(private logService: LogService) {
    this.regroupEvents = [];
    //this.startRegroup = 0;
    //this.endRegroup = 0;
  }

  changeRegroupTimeValue(regroupTime : number){
    this.regroupTimeSource.next(regroupTime);
  }

  changeStartRegroupValue(startRegroup : Date){
    this.startRegroupSource.next(startRegroup);
  }

  changeEndRegroupValue(endRegroup : Date){
    this.endRegroupSource.next(endRegroup);
  }

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

  getRegroup(index : number, regroupTime : number, startRegroup : Date, endRegroup : Date){
    //il tempo di raggruppamento uguale a 0 implica la visualizzazione dell'intero log
    if(regroupTime==0){
      return this.logService.getLog().Events;
    }
    else {
      //trovo la data dell'evento iniziale
      let start = new Date ([this.logService.getLog().Events.at(this.logService.getLog().Events.length-1)!.Date, this.logService.getLog().Events.at(this.logService.getLog().Events.length-1)!.Time].join('T').replaceAll("/", "-") + "Z");

      //trovo l'inizio e la fine del raggruppamento in ms
      this.changeStartRegroupValue( new Date(start.getTime() + (index-1) * regroupTime));
      this.changeEndRegroupValue( new Date(start.getTime() + index * regroupTime));
      
      //filtraggio degli eventi del log contenuti nell'intervallo tra l'inizio e la fine del raggruppamento
      return this.logService.getLog().Events.filter( (e:LogRow) => {
        let DateTime = new Date([e.Date, e.Time].join('T').replaceAll("/", "-") + "Z").getTime();
        return DateTime >= startRegroup.getTime() && DateTime <= endRegroup.getTime();
      } );
    }
  }
  
}
