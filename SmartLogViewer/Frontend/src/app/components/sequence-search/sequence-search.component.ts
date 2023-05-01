import {Component, OnInit} from '@angular/core';
import {SequencesService} from "../../services/sequences.service";
import {Sequence} from "../../sequence.classes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SequenceFetchService} from "../../services/sequence-fetch.service";

@Component({
  selector: 'app-sequence-search',
  templateUrl: './sequence-search.component.html',
  styleUrls: ['./sequence-search.component.css']
})
export class SequenceSearchComponent{

  sequences: string[] = [];
  isValidFormSubmitted: boolean;
  sequenceForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private sequenceFetchService: SequenceFetchService, private sequencesService: SequencesService) {
    this.isValidFormSubmitted = false;
    this.sequenceForm = this.formBuilder.group(
        {
          sequence: [null, [Validators.required]],
        });
    if (this.sequencesService.Sequences == undefined || this.sequencesService.Sequences.length == 0) {
      this.getSequencesNames();
    } else {
      this.sequencesService.Sequences.forEach((sequence) => this.sequences.push(sequence), [this]);
    }
    
  }

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.sequenceForm.valid) {
      this.isValidFormSubmitted = true;
    }
    
    this.getSequence(this.sequence?.value);
  }

  get sequence() {
    return this.sequenceForm.get('sequence');
  }

  // Event handlers
  private namesHandler(): any {
    return (fetchedSequences: string[]) => {
      fetchedSequences.forEach((sequence) => this.sequences.push(sequence), [this]);
      this.sequencesService.Sequences = fetchedSequences;
      console.log(fetchedSequences);
    };
  }

  private sequencesHandler(): any {
    return (fetchedSequence: Sequence) => {
      this.sequencesService.ChosenSequence = fetchedSequence;
      console.log(fetchedSequence);
    };
  }


  // Error handlers
  private errorNamesHandler(): any {
    return (err: string) => {
      console.log("Non disponibile");
    }
  }

  private errorSequenceHandler(): any {
    return (errorSequence: any) => {
      console.log(`La sequenza ${errorSequence} non è disponibile!`);
    }
  }
  
  // Metodi di fetch HTTP
  getSequencesNames() : void {
    this.sequenceFetchService.getSequences().subscribe(
            {
              next: this.namesHandler(),
              error: this.errorNamesHandler()
            }
        )
  }
  
  getSequence(name: string) : void {
    this.sequenceFetchService.getSequenceInformation(name).subscribe({
      next: this.sequencesHandler(),
      error: this.errorSequenceHandler()
    })
  }


}
