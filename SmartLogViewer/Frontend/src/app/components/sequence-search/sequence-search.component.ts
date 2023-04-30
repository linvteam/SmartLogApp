import {Component, OnInit} from '@angular/core';
import {SequencesService} from "../../services/sequences.service";
import {Sequence} from "../../sequence.classes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {sequence} from "@angular/animations";

@Component({
  selector: 'app-sequence-search',
  templateUrl: './sequence-search.component.html',
  styleUrls: ['./sequence-search.component.css']
})
export class SequenceSearchComponent implements OnInit{

  sequences: string[] = [];
  isValidFormSubmitted: boolean;
  sequenceForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private sequencesService: SequencesService) {
    this.isValidFormSubmitted = false;
    this.sequenceForm = this.formBuilder.group(
        {
          sequence: [null, [Validators.required]],
        });
  }

  ngOnInit(): void {
    this.getSequencesNames();
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
  
  onSequenceChange() {
    console.log((<string>this.sequence?.value));
  }

  // Event handlers
  private namesHandler(): any {
    return (fetchedSequences: string[]) => {
      fetchedSequences.forEach((sequence) => this.sequences.push(sequence), [this]);
    };
  }

  private sequencesHandler(): any {
    return (fetchedSequence: Sequence) => {
      console.log(fetchedSequence);
    };
  }


  // Error handlers
  private errorNamesHandler(): any {
    return (err: string) => {
      this.sequences.push("Non disponibile");
    }
  }

  private errorSequenceHandler(): any {
    return (errorSequence: any) => {
      this.sequences.push(`La sequenza ${errorSequence} non è disponibile!`);
    }
  }
  
  // Metodi di fetch HTTP
  getSequencesNames() : void {
    this.sequences.splice(0);
    this.sequencesService.getSequences().subscribe(
            {
              next: this.namesHandler(),
              error: this.errorNamesHandler()
            }
        )
  }
  
  getSequence(name: string) : void {
    this.sequencesService.getSequenceInformation(name).subscribe({
      next: this.sequencesHandler(),
      error: this.errorSequenceHandler()
    })
  }


}
