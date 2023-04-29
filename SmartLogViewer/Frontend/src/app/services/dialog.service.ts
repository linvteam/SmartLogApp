import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private valueSource = new BehaviorSubject<number>(0);
  currentValue = this.valueSource.asObservable();
  
  constructor() { }
  
  changeValue(value : number){
    this.valueSource.next(value)
  }
  
}
