import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
    private callback: any;
    public errorMessage: string = '';

    constructor(public activeModal: NgbActiveModal) {
    }

    public setup(errorMessage: string, callback: any) {
        this.errorMessage = errorMessage;
        this.callback = callback;
    }

    public retry() {
        this.activeModal.close();
        this.callback();
    }
}
