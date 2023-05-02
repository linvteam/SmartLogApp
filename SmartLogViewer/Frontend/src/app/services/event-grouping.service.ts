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

  constructor(private logService: LogService) { }

  changeValue(regroupTime : number){
    this.regroupTimeSource.next(regroupTime)
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

  getRegroup(index : number, regroupTime : number){
    //trovo la data dell'evento iniziale
    let start = new Date ([this.logService.getLog().Events.at(this.logService.getLog().Events.length-1)!.Date, this.logService.getLog().Events.at(this.logService.getLog().Events.length-1)!.Time].join('T').replaceAll("/", "-") + "Z");

    //trovo l'inizio e la fine del raggruppamento in ms
    let startRegroup = start.getTime() + (index-1) * regroupTime;
    let endRegroup = startRegroup + index * regroupTime;

    //filtraggio degli eventi del log contenuti nell'intervallo tra l'inizio e la fine del raggruppamento
    return this.logService.getLog().Events.filter( (e:LogRow) => {
      let DateTime = new Date([e.Date, e.Time].join('T').replaceAll("/", "-") + "Z").getTime();
      return DateTime >= startRegroup && DateTime <= endRegroup;
    } );
  }
  
}
