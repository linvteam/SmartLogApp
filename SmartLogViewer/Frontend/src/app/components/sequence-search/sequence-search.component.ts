import {Component, ViewChild} from '@angular/core';
import {SequenceSearch} from "../../LogManipulator/sequence-search";
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import {Sequence} from "../../sequence.classes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SequenceFetchService} from "../../services/fetch/sequence-fetch.service";
import {Identity} from "../../LogManipulator/identity";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-sequence-search',
  templateUrl: './sequence-search.component.html',
  styleUrls: ['./sequence-search.component.css']
})
export class SequenceSearchComponent{

  modalDialog : NgbModal|undefined;
  modalTitle: string = "";
  modalContent: string = "";
  
  @ViewChild('errorModal')errorModal: any;
  
  sequences: string[] = [];
  sequenceForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private logManipulationService: LogManipulationService, private sequenceFetchService: SequenceFetchService, private modalService: NgbModal) {
    this.sequenceForm = this.formBuilder.group(
        {
          sequence: [null, [Validators.required]],
        });

    if (this.sequences == undefined || this.sequences.length == 0) {
      this.getSequencesNames();
    } else {
      this.sequences.forEach((sequence) => this.sequences.push(sequence));
    }
    // MANCANO LE OPTIONS
  this.modalService.open(this.errorModal, {
    size: 'lg'
  });
  }

  onSubmit() {
    this.getSequence(this.sequence?.value);
  }

  get sequence() {
    return this.sequenceForm.get('sequence');
  }

  // Event handlers
  private namesHandler(): any {
    return (fetchedSequences: string[]) => {
      this.sequences.splice(0);
      fetchedSequences.forEach((sequence) => this.sequences.push(sequence));
    };
  }

  private sequencesHandler(): any {
    return (fetchedSequence: Sequence) => {
      this.logManipulationService.setManipulation(new SequenceSearch(new Sequence(fetchedSequence)));
    };
  }


  // Error handlers
  private errorNamesHandler(): any {
    return (err: HttpErrorResponse) => {
      this.sequences.splice(0);
      this.modalTitle = "Errore interno del server";
      this.modalContent = "Impossibile leggere il file di configurazione!";
      // MANCANO LE OPTIONS
      this.modalService.open(this.errorModal, {
        size: 'lg'
      });
    }
  }

  private errorSequenceHandler(): any {
    return (err: HttpErrorResponse) => {
      this.logManipulationService.setManipulation(new Identity());
      
      if(err.status == 404) {
        this.modalTitle = "Sequenza non trovata";
        this.modalContent = `La sequenza ${err.message} non è disponibile!`;
      } else {
        this.modalTitle = "Errore interno del server";
        this.modalContent = "Impossibile leggere il file di configurazione!";
      }
      // MANCANO LE OPTIONS
      this.modalService.open(this.errorModal, {
        size: 'lg'
      });
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
    });

  }


}
