import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseURL} from "../connection-info";
import {Sequence} from "../sequence.classes";
@Injectable({
  providedIn: 'root'
})
export class SequencesService {
  
  private sequences: string[] = [];
  private chosenSequence?: Sequence;
  
  constructor() {
    this.chosenSequence = undefined;
  }
  
  public set Sequences(sequences: string[]) {
    sequences.forEach((sequence) => this.sequences.push(sequence), [this]);
  }
  
  public set ChosenSequence(sequence: Sequence) {
    this.chosenSequence = new Sequence(sequence);
  }
  
  public get Sequences() {
    return this.sequences;
  }
  
}
