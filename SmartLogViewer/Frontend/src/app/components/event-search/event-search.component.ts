import { Component } from '@angular/core';
import { LogManipulationService } from '../../services/LogManipulation/log-manipulation.service';
import { EventSearch } from "../../LogManipulator/event-search";
import { FormBuilder } from "@angular/forms";
import { Identity } from '../../LogManipulator/identity';


@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent {

    uploadForm = this.formBuilder.group({
        q: ''
    });

    constructor(private formBuilder: FormBuilder, private logManipulationService: LogManipulationService) { }

    onSubmit(): void {
        if (this.uploadForm.value.q as string == "") {
            this.logManipulationService.setManipulation(new Identity())
        } else {
            this.logManipulationService.setManipulation(new EventSearch(this.uploadForm.value.q as string));
        }
    }

}
