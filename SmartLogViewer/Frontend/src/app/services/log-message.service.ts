import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Log } from "../log.classes";

@Injectable({
  providedIn: 'root'
})
export class LogMessageService {

    private logSource = new BehaviorSubject<string>("");
    currentValue = this.logSource.asObservable();

    constructor() { }

    changeValue(value: string) {
        this.logSource.next(value)
    }

}
